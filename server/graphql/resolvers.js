'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var gqlLang = require('graphql/language');

const typeResolvers = {
    Date: {
        __parseValue(value) {
            return new Date(value); // value from the client
        },
        __serialize(value) {
            return value.getTime(); // value sent to the client
        },
        __parseLiteral(ast) {
            if (ast.kind === gqlLang.Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        }
    }
};

function generateResolvers(models) {
    let rootResolvers = {};
    _.forEach(models, m => {
        rootResolvers[m.pluralModelName] = (obj, args, context) => {
            console.log ('CONTEXT', context)
            console.log ('ARGS', args)
            return m.find(args).then( res => {
                return res;
            });
        };
    });

    let typeResolvers = {}; 
    _.forEach(models, m => {
        typeResolvers[m.modelName] = (obj, args, context) => {
            console.log ('MODEL CONTEXT', context)
            console.log ('MODEL ARGS', args)
            return m.findById(obj.id);
        };
    });

    return _.extend(typeResolvers, {Query: rootResolvers}, typeResolvers);
}
module.exports = {
    generateResolvers
};
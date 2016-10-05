'use strict';

var _ = require('lodash');
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

function generateRootResolvers(models) {
    let resolvers = {};
    _.forEach(models, m => {
        resolvers[m.pluralModelName] = (obj, args, context) => {
            return m.find({skip: args.after, limit: args.first}).then(res => {
                return res;
            });
        };
    });
    _.forEach(models, m => {
        resolvers[m.modelName] = (obj, args, context) => {
            return m.findOne(args).then(res => {
                return res;
            });
        };
    });
    return { Query: resolvers };
}

function generateModelResolvers(models) {
    let resolvers = {};
    _.forEach(models, m => {
        resolvers[m.modelName] = (obj, args, context) => {
            return m.findById(obj.id);
        };
        let resolver = {};
        _.forEach(m.relations, r => {
            resolver[r.name] = (obj, args, context) => {
                let query = {};
                query[r.keyTo] = obj[r.keyFrom];
                return r.modelTo.find({where: query, skip: args.after, limit: args.first}).then(res => {
                    return res;
                });
            };
        });
        resolvers[m.modelName] = resolver;
    });
    return resolvers;
}

function generateResolvers(models) {
    return _.merge(typeResolvers, generateRootResolvers(models), generateModelResolvers(models));
}

module.exports = {
    generateResolvers
};
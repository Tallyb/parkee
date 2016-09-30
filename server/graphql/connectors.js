'use strict';

var gqlTools = require('graphql-tools');
var _ = require('lodash');
var Promise = require('bluebird');

function generateConnectors(models) {
    let rootResolvers = {};
    _.forEach(models, m => {
        rootResolvers[m.pluralModelName] = Promise.promisify(m.find);
    });
    return _.extend({Query: rootResolvers});
}
module.exports = {
    generateConnectors
};
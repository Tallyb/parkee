'use strict';

var apollo = require('apollo-server');
var gqlTools = require('graphql-tools');
var bodyParser = require('body-parser');

var _ = require('lodash');
var modelSchema = require('./schema.js');
var modelResolvers = require('./resolvers.js');

module.exports = function graphql(app, noGraphiql) {
    //Need to filter only the public models
    const models = _.filter(app.models(), m => {
        return true;
    });

    let typeDefs = [`
    scalar Date
    ${modelSchema.generateEnums(models)}
    ${modelSchema.generateTypeDefs(models)}
    type Query { ${modelSchema.generateQueries(models)} }
    schema {
      query: Query
    }
    `];

    let resolvers = modelResolvers.generateResolvers(models);
    let schema = gqlTools.makeExecutableSchema({
        typeDefs,
        resolvers,
        resolverValidationOptions: {
            requireResolversForAllFields: false
        }
    });

    let router = app.loopback.Router();
    router.use('/graphql', bodyParser.json(), apollo.apolloExpress({ schema: schema }));
    if (!noGraphiql) {
        router.use('/graphiql', apollo.graphiqlExpress({
            endpointURL: '/graphql'
        }));
    }
    app.use(router);
};

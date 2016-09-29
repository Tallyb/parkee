'use strict';

var apollo = require('apollo-server');
var gqlTools = require('graphql-tools');
var bodyParser = require('body-parser');

//var _ = require('lodash');
var gqlSchema = require('./schema.js');

module.exports = function graphql (app, noGraphiql) {
    let typeDefs = [`
    scalar Date
    ${gqlSchema.generateEnums(app.models())}
    ${gqlSchema.generateTypeDefs(app.models())}
    type Query { ${gqlSchema.generateQueries(app.models())} }
    schema {
      query: Query
    }
    `];
    let schema = gqlTools.makeExecutableSchema({
        typeDefs,
        resolvers: {}
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

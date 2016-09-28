'use strict';

var apollo = require('apollo-server');
//import {apolloExpress} from 'apollo-server';
var gqlTools = require ('graphql-tools');
var bodyParser = require ('body-parser');
//import {makeExecutableSchema} from 'graphql-tools';

var _ = require('lodash');

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  const typeDefs = [`
    schema {
      query: RootQuery
    }
    type RootQuery {
      aNumber: Int
    }
    `];
  let schema = gqlTools.makeExecutableSchema ({
    typeDefs,
    resolvers: {},
  });

  let router = app.loopback.Router();
  router.use('/graphql', bodyParser.json(), apollo.apolloExpress({schema: schema}));
  router.use('/graphiql', apollo.graphiqlExpress({
    endpointURL: '/graphql',
  }));
  app.use(router);
  //app.use('/graphql', bodyParser.json(), apollo.apolloExpress({schema: schema}));

  _.forEach(app.models, m => {
    console.log (m.modelName);
  });
  console.log('Models:', app.models);
  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};

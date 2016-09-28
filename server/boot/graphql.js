var apollo = require('apollo-server');
var _ = require('lodash');

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  let router = server.loopback.Router();
  //router.get('/graphql', server.loopback.status());
  //server.use(router);
  //app.use('/graphql', bodyParser.json(), apollo.apolloExpress({schema: schema}));

  console.log ('SOUCES', app.datasources)
  console.log ('MODELS', app.models)
  _.forEach(app.models, m => {
    console.log (m.modelName)
  }); 
  console.log('Models:', models);
  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};

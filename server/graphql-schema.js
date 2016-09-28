'use strict';

var _ = require('lodash');

module.exports = function generateSchema(app) {
    console.log ('NOTE', app.models)
  _.forEach(app.models, m => {
    console.log ('MODEL', m.modelName);
  });
};

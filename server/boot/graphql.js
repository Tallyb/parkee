'use strict';

var graphql = require('../graphql/boot.js');

module.exports = function (app) {
    require('../graphql/boot.js')(app);
    //graphql(app);
};

'use strict';

/**
 * module dependencies
 */
var users   = require('./user.controller.js'),
    express = require('express'),
    router  = express.Router();

module.exports = function (app) {
    router.get('/', users.findAll);
    router.post('/', users.create);
    app.use('/api/users', router);
};

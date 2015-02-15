'use strict';

/**
 * module dependencies
 */
var User     = require('../api/user/user.model'),
    config   = require('../config/config'),
    express  = require('express'),
    router   = express.Router(),
    passport = require('./local/passport');


module.exports = function (app) {

    passport.setup(User, config);

    router.use('/local', require('./local'));

    app.use('/auth', router);

//    Notes:
//        POST http://your.api.com/authentication for login
//        DELETE http://your.api.com/authentication for logout
};

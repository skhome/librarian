#!/bin/env node
'use strict';

/**
 * module dependencies
 */
var pkg     = require('../../package.json'),
    config  = require('./config/config'),
    colors  = require('colors'),
    logger  = require('mm-node-logger')(module),
    mongodb = require('mm-mongoose-connection'),
    express = require('./config/express');

/**
 * This is the main application server file
 */

// initialize the application
var app = express();

// read configs
var port         = config.get('server:port'),
    environment  = config.get('environment'),
    mongoConfig  = config.get('mongodb'),

    serverBanner = [
        ' ',
        '  _     _ _                    _               ',
        ' | |   (_) |__  _ __ __ _ _ __(_) __ _ _ __    ',
        ' | |   | | \'_ \\| \'__/ _` | \'__| |/ _` | \'_ \\ ',
        ' | |___| | |_) | | | (_| | |  | | (_| | | | |  ',
        ' |_____|_|_.__/|_|  \\__,_|_|  |_|\\__,_|_| |_|',
        ' ',
        ' = Powered by MongoDB, Express, AngularJS, NodeJS =',
        ''
    ].join('\n');


console.log(serverBanner);

mongodb(mongoConfig, function () {

    // register components
    require('./api/user')(app);

    // needed for HTML5 History API
    app.route('/*').get(function (request, response) {
        response.redirect('/#' + request.originalUrl);
    });

    app.listen(port, function () {
        logger.info(' Librarian %s started serving requests on port %s for environment %s.',
                    pkg.version.cyan,
                    colors.cyan(port),
                    environment.cyan);
    });

});

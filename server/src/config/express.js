'use strict';

/**
 * module dependencies
 */
var config       = require('./config'),
    helmet       = require('helmet'),
    morgan       = require('morgan'),
    compress     = require('compression'),
    express      = require('express'),
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    errorHandler = require('errorhandler');

module.exports = function () {

    // initialize our express application
    var app = express();

    // should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        }
    }));

    // initialize static server that will spit out contents of client folder
    app.use(express.static(__dirname + config.get('site')));

    // log every request to the console
    app.use(morgan('dev'));

    // show error messages on development environment
    if (config.get('security:stacktrace')) {
        app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    }

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    // use helmet to secure Express headers
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());

    if (!config.get('server:caching')) {
        app.use(helmet.noCache());
    }

    // use the passport package for authentication
    app.use(passport.initialize());
    app.use(passport.session());

    // setup CORS
    app.all('*', function (request, response, next) {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Credentials', true);
        response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        response.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        if (request.method === 'OPTIONS') {
            return response.sendStatus(204);
        }
        next();
    });

    return app;
};

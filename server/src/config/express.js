'use strict';

/**
 * module dependencies
 */
var config       = require('./config'),
    helmet       = require('helmet'),
    morgan       = require('morgan'),
    express      = require('express'),
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    errorHandler = require('errorhandler');

function configureStacktraceInclusion (app) {
    if (config.get('security:stacktrace')) {
        app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    }
}

function configureLogging (app) {
    app.use(morgan('dev'));
}

function configurePayloadParsing (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}

function configureSecurity (app) {
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());

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
}

function configureCaching (app) {
    if (!config.get('server:caching')) {
        app.use(helmet.noCache());
    }
}

function configureAuthentication (app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function configureStaticContent (app) {
    app.use(express.static(__dirname + config.get('site')));
}

module.exports = function () {
    var app = express();
    configureStaticContent(app);
    configureLogging(app);
    configureStacktraceInclusion(app);
    configurePayloadParsing(app);
    configureSecurity(app);
    configureCaching(app);
    configureAuthentication(app);
    return app;
};

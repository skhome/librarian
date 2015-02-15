'use strict';

/**
 * module dependencies
 */
var config  = require('nconf'),
    argv    = require('yargs').argv,
    profile = argv.profile || 'development',
    path    = __dirname;

module.exports = config
    .argv()                                                        // command line arguments first
    .env()                                                         // environment variables next
    .file(profile, path + '/env/application-' + profile + '.json') // profile specific next
    .file('all', path + '/env/application.json')                   // default ones last
    .use('memory');

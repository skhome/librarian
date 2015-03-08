'use strict';

module.exports = function (config) {

    function normalizationBrowserName(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jspm', 'mocha', 'chai', 'traceur' ],

        // list of files / patterns to load in the browser
        // empty because we will load our files via JSPM
        files: [],

        // list of files to exclude
        exclude: [],

        // configuration for the JSPM module loader and ES6 handling
        jspm: {
            config: 'jspm.conf.js',
            packages: 'jspm_packages/',
            loadFiles: [
                'test/**/*.js'
            ],
            serveFiles: [ 'app/**' ]
        },

        // pre-process matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.js': [ 'traceur'],
            'app/**/*.js': [ 'traceur', 'coverage']
        },

        // options passed to the traceur-compiler
        traceurPreprocessor: {
            options: {
                sourceMaps: true
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'progress', 'coverage' ],

        coverageReporter: {
            dir: '../build/coverage/',
            reporters: [
                { type: 'text', subdir: normalizationBrowserName },
                { type: 'html', subdir: normalizationBrowserName }
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
        // config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'Firefox' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};

'use strict';

// =============================================
//            LOAD CORE MODULES
// =============================================

var fs        = require('fs'),
    pkg       = require('./package.json'),
    argv      = require('yargs').argv,
    gulp      = require('gulp'),
    // semver    = require('semver'),
    browser   = require('tiny-lr')(),
    // wiredep     = require('wiredep').stream,
    changelog = require('conventional-changelog');
// runSequence = require('run-sequence');

// =============================================
//            LOAD GULP PLUGINS
// =============================================

var size        = require('gulp-size'),
    jscs        = require('gulp-jscs'),
    mocha       = require('gulp-mocha'),
    gutil       = require('gulp-util'),
    gulpif      = require('gulp-if'),
    jshint      = require('gulp-jshint'),
    refresh     = require('gulp-livereload'),
    istanbul    = require('gulp-istanbul'),
    jscsStylish = require('gulp-jscs-stylish');

// initialize gulp task help
require('gulp-help')(gulp);

// =============================================
//            DECLARE CONSTANTS
// =============================================

// other constants
var ENV    = !!argv.env ? argv.env : 'development',
    COLORS = gutil.colors;

// =============================================
//            DECLARE VARIABLES
// =============================================

var isWatching = false,
    noop       = function () {
    };


// =============================================
//            COMMAND LINE ERROR HANDLING
// =============================================

if (!ENV.match(new RegExp(/production|development/))) {
    gutil.log(COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV + '\'! Usage: gulp test:unit --env=(development|production)'));
    return process.exit(1);
}

// =============================================
//            PRINT INFO MESSAGE
// =============================================

gutil.log(COLORS.cyan('********** RUNNING IN ' + ENV + ' ENVIRONMENT **********'));


// =============================================
//              DECLARE PATHS
// =============================================

var paths   = {
        server: {
            basePath: 'server',
            jshintrc: 'server/src/.jshintrc',
            jscsrc: 'server/.jscsrc',
            scripts: 'server/src/**/*.js',
            test: {
                unit: 'server/test/**/*.js'
            }
        }
    },
    options = {
        mocha: {
            reporter: 'spec',
            slow: 1000
        },
        istanbul: {
            instrument: {
                includeUntested: true
            },
            report: {
                dir: './build/coverage'
            }
        }

    };


// =============================================
//                SUB TASKS
// =============================================

gulp.task('server:hint', 'Hint server JavaScripts files', function () {
    return gulp.src(paths.server.scripts)
        .pipe(jshint(paths.server.jshintrc))
        .pipe(jscs({ configPath: paths.server.jscsrc }))
        .on('error', noop)
        .pipe(jscsStylish.combineWithHintResults())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpif(!isWatching, jshint.reporter('fail')))
        .pipe(refresh(browser));
});

gulp.task('server:test', 'Run tests on server sources', [ 'server:hint' ], function (done) {
    gulp.src(paths.server.scripts)
        .pipe(istanbul(options.istanbul.instrument))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
                gulp.src(paths.server.test.unit)
                    .pipe(mocha(options.mocha))
                    .pipe(istanbul.writeReports(options.istanbul.report))
                    .on('end', done);
            });

});

// =============================================
//                MAIN TASKS
// =============================================

gulp.task('changelog', 'Generate changelog', function (callback) {
    changelog({
        version: pkg.version,
        repository: pkg.repository.url
    }, function (err, data) {
        if (err) {
            gutil.log(COLORS.red('Error: Failed to generate changelog ' + err));
            return process.exit(1);
        }
        fs.writeFileSync('CHANGELOG.md', data, callback());
    });
});


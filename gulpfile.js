'use strict';

// =============================================
//            LOAD CORE MODULES
// =============================================

var fs        = require('fs'),
    pkg       = require('./package.json'),
    argv      = require('yargs').argv,
    gulp      = require('gulp'),
    semver    = require('semver'),
    browser   = require('tiny-lr')(),
    // wiredep     = require('wiredep').stream,
    changelog = require('conventional-changelog');
// runSequence = require('run-sequence');

// =============================================
//            LOAD GULP PLUGINS
// =============================================

var size        = require('gulp-size'),
    jscs        = require('gulp-jscs'),
    gutil       = require('gulp-util'),
    gulpif      = require('gulp-if'),
    jshint      = require('gulp-jshint'),
    refresh     = require('gulp-livereload'),
    jscsStylish = require('gulp-jscs-stylish');

// initialize gulp task help
require('gulp-help')(gulp);

// =============================================
//            DECLARE CONSTANTS
// =============================================

// environment constants
var PRODUCTION_URL     = 'http://librarian.herokuapp.com',
    DEVELOPMENT_URL    = 'http://127.0.0.1:3000',
    PRODUCTION_CDN_URL = 'http://127.0.0.1:5000';

// other constants
var ENV      = !!argv.env ? argv.env : 'development',
    COLORS   = gutil.colors,
    BROWSERS = !!argv.browsers ? argv.browsers : 'PhantomJS';
// CDN_BASE             = !!argv.nocdn ? DEVELOPMENT_URL : PRODUCTION_CDN_URL,
// MODULE_NAME          = pkg.name,
// API_VERSION          = '1.0',
// GIT_REMOTE_URL       = 'https://' + process.env.GH_TOKEN + '@github.com/martinmicunda/employee-scheduling.git',
// LIVERELOAD_PORT      = 35729,
// TEMPLATE_BASE_PATH   = 'app',
// BUILD_WITHOUT_TEST   = !!argv.notest ? true : false,
// APPLICATION_BASE_URL = ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL;

// =============================================
//            DECLARE VARIABLES
// =============================================

var hasGitChanges = '',
    isWatching    = false,
    noop          = function () {
    };


// =============================================
//            COMMAND LINE ERROR HANDLING
// =============================================

if (!ENV.match(new RegExp(/production|development/))) {
    gutil.log(COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV + '\'! Usage: gulp test:unit --env=(development|production)'));
    return process.exit(1);
}

if (!BROWSERS.match(new RegExp(/PhantomJS|Chrome|Firefox|Safari/))) {
    gutil.log(COLORS.red('Error: The argument \'browsers\' has incorrect value \'' + BROWSERS + '\'! Usage: gulp test:unit --env=(PhantomJS|Chrome|Firefox|Safari)'));
    return process.exit(1);
}

// =============================================
//            PRINT INFO MESSAGE
// =============================================

gutil.log(COLORS.cyan('********** RUNNING IN ' + ENV + ' ENVIRONMENT **********'));


// =============================================
//              DECLARE PATHS
// =============================================

var paths = {

    server: {
        basePath: 'server',
        jshintrc: 'server/.jshintrc',
        jscsrc: 'server/.jscsrc',
        scripts: 'server/**/*.js'
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


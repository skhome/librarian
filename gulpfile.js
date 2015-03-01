'use strict';

// =============================================
//            LOAD CORE MODULES
// =============================================

var fs          = require('fs'),
    pkg         = require('./package.json'),
    del         = require('del'),
    argv        = require('yargs').argv,
    gulp        = require('gulp'),
    browser     = require('tiny-lr')(),
    httpProxy   = require('http-proxy'),
    changelog   = require('conventional-changelog'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync');

// =============================================
//            LOAD GULP PLUGINS
// =============================================

var tap         = require('gulp-tap'),
    rev         = require('gulp-rev'),
    size        = require('gulp-size'),
    jscs        = require('gulp-jscs'),
    less        = require('gulp-less'),
    util        = require('gulp-util'),
    cache       = require('gulp-cache'),
    mocha       = require('gulp-mocha'),
    filter      = require('gulp-filter'),
    gulpif      = require('gulp-if'),
    inject      = require('gulp-inject'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    usemin      = require('gulp-usemin'),
    flatten     = require('gulp-flatten'),
    bytediff    = require('gulp-bytediff'),
    htmlhint    = require('gulp-htmlhint'),
    imagemin    = require('gulp-imagemin'),
    refresh     = require('gulp-livereload'),
    istanbul    = require('gulp-istanbul'),
    minifyCss   = require('gulp-minify-css'),
    minifyHtml  = require('gulp-minify-html'),
    ngAnnotate  = require('gulp-ng-annotate'),
    sourceMaps  = require('gulp-sourcemaps'),
    jscsStylish = require('gulp-jscs-stylish');

var LessPluginCleanCss   = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleanCss             = new LessPluginCleanCss({ advanced: true }),
    autoPrefix           = new LessPluginAutoPrefix({ browsers: [ 'last 2 versions' ] });


// =============================================
//            DECLARE CONSTANTS
// =============================================

// other constants
var ENV    = !!argv.env ? argv.env : 'development',
    COLORS = util.colors;

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
    util.log(COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV + '\'! Usage: gulp test:unit --env=(development|production)'));
    return process.exit(1);
}

// =============================================
//            UTILITY FUNCTIONS
// =============================================

function formatPercent (num, precision) {
    return (num * 100).toFixed(precision);
}

function bytediffFormatter (data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return COLORS.yellow(data.fileName + ' went from ' +
    (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
    ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference);
}

var proxyTarget = 'http://localhost:8000/';
var proxyApiPrefix = 'api';
var proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

function proxyMiddleware (request, response, next) {
    if (request.url.indexOf(proxyApiPrefix) !== -1) {
        proxy.web(request, response);
    } else {
        next();
    }
}

function startBrowserSync (baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;
    browserSync({
        files: files,
        port: 8000,
        notify: false,
        server: {
            baseDir: baseDir,
            middleware: [
                proxyMiddleware
                // modRewrite([ '!\\.\\w+$ /index.html [L]' ]) // require for HTML5 mode
            ]
        },
        browser: browser
    });
}

// =============================================
//            PRINT INFO MESSAGE
// =============================================

util.log(COLORS.cyan('********** RUNNING IN ' + ENV + ' ENVIRONMENT **********'));


// =============================================
//              DECLARE PATHS
// =============================================

var paths   = {
        build: {
            basePath: 'build',
            temp: {
                basePath: 'build/temp/',
                styles: 'build/temp/styles/',
                scripts: 'build/temp/scripts/'
            },
            dist: {
                basePath: 'build/dist/',
                fonts: 'build/dist/fonts/',
                images: 'build/dist/images/',
                styles: 'build/dist/css/'
            }
        },
        client: {
            basePath: 'client',
            fonts: [ 'client/fonts/**/*.{eot,svg,ttf,woff}', 'client/jspm_packages/**/*.{eot,svg,ttf,woff}' ],
            images: 'client/images/**/*.{png,gif,jpg,jpeg}',
            scripts: 'client/app/**/*.js',
            styles: 'client/less/**/*.less',
            html: {
                index: 'client/index.html',
                templates: 'client/app/**/*.html'
            },
            jshintrc: 'client/.jshintrc',
            htmlhintrc: 'client/.htmlhintrc'
        },
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

// initialize gulp task help
require('gulp-help')(gulp);

// =============================================
//                SUB TASKS
// =============================================

gulp.task('clean', 'Clean build artifacts', function (done) {
    return del(paths.build.basePath, done);
});

gulp.task('client:jshint', 'Hint JavaScript files', function () {
    return gulp.src(paths.client.scripts)
        .pipe(jshint(paths.client.jshintrc))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('client:htmlhint', 'Hint HTML files', function () {
    return gulp.src([ paths.client.html.index, paths.client.html.templates ])
        .pipe(htmlhint(paths.client.htmlhintrc))
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failReporter());
});

gulp.task('client:less', 'Compile LESS files', function () {
    return gulp.src([ paths.client.styles ])
        .pipe(sourceMaps.init())
        .pipe(less({ plugins: [ cleanCss, autoPrefix ] }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(size({ title: 'css' }))
        .pipe(gulp.dest(paths.build.temp.styles));
});

gulp.task('client:bundle', 'create JS production bundle', [ 'client:jshint' ], function (done) {
    var Builder       = require('systemjs-builder'),
        builder       = new Builder(),
        bundleFile    = paths.build.temp.scripts + 'build.js',
        bundleOptions = { sourceMaps: true, config: { sourceRoot: paths.build.temp.scripts } }

    builder.loadConfig('./client/jspm.conf.js')
        .then(function () {
            builder.config({ baseURL: 'file:' + process.cwd() + '/client' });
            builder.buildSFX('app/bootstrap', bundleFile, bundleOptions)
                .then(function () {
                    return done();
                })
                .catch(function (error) {
                    done(new Error(error));
                });
        });
});

gulp.task('client:fonts', 'copy fonts to `build/dist` directory', function () {
    return gulp.src(paths.client.fonts)
        .pipe(filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(flatten())
        .pipe(gulp.dest(paths.build.dist.fonts))
        .pipe(size({ title: 'fonts' }));
});

gulp.task('client:images', 'minify and copy images to `build/dist` directory', function () {
    return gulp.src(paths.client.images)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.build.dist.images))
        .pipe(size({ title: 'images' }));
});

gulp.task('client:extras', 'copy other project files into the `build/dist` directory', function () {
    return gulp.src([ paths.client.basePath + '*.{ico,png,txt}' ])
        .pipe(gulp.dest(paths.build.dist.basePath));
});


gulp.task('client:compile', 'compile all files', [ 'client:htmlhint', 'client:less', 'client:bundle' ], function () {
    var bundleFile = paths.build.temp.scripts + 'build.js';

    return gulp.src(paths.client.html.index)
        .pipe(inject(gulp.src(bundleFile, { read: false }), {
            starttag: '<!-- inject:build:js -->',
            relative: true
        }))
        .pipe(usemin({
            css: [
                bytediff.start(),
                minifyCss({ keepSpecialComments: 0 }),
                bytediff.stop(bytediffFormatter),
                rev()
            ],
            js: [
                bytediff.start(),
                ngAnnotate({ add: true, single_quotes: true, stats: true }),
                uglify(),
                bytediff.stop(bytediffFormatter),
                rev()
            ],
            html: [
                bytediff.start(),
                minifyHtml({ empty: true }),
                bytediff.stop(bytediffFormatter)
            ]
        }))
        .pipe(gulp.dest(paths.build.dist.basePath))
        .pipe(size({ title: 'compile', showFiles: true }));
});

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

// ---------------------------------------------
//            DEVELOPMENT TASKS
// ---------------------------------------------

gulp.task('serve', 'Serve for the dev environment', function() {
    startBrowserSync(['build/temp', 'client']);
});

gulp.task('serve:dist', 'serve the production environment', [ 'build' ], function () {
    startBrowserSync([ paths.build.dist.basePath ]);
});

// ---------------------------------------------
//               BUILD TASKS
// ---------------------------------------------

gulp.task('build', 'build application for deployment', function (done) {
    runSequence([ 'clean' ], [ 'client:compile', 'client:extras', 'client:images', 'client:fonts' ], done);
});

gulp.task('changelog', 'Generate changelog', function (callback) {
    changelog({
        version: pkg.version,
        repository: pkg.repository.url
    }, function (err, data) {
        if (err) {
            util.log(COLORS.red('Error: Failed to generate changelog ' + err));
            return process.exit(1);
        }
        fs.writeFileSync('CHANGELOG.md', data, callback());
    });
});


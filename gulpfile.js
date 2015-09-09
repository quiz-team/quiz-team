// load env
require('dotenv').load();

// Gulp depencies
// ---------------------------------------
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha   = require('gulp-mocha');
var bs      = require('browser-sync');
var reload  = bs.reload;
var addStream = require('add-stream');
var concat = require('gulp-concat');
var gulpNgConfig = require('gulp-ng-config');

// the paths to our app files
var paths = {
  // client-side .js files
  scripts: [
    'meatloaf/www/**/*.js',
    '!meatloaf/www/lib/**/*',
    'server/**/*.js',
    '!server/trivia.js'
  ],
  // all the html
  html: [
    'meatloaf/www/**/*.html'
  ],
  // css files
  styles: [
    'meatloaf/www/styles/*.css'
  ],
  //tests
  tests: {
    server: [
    'specs/server/**/*.js'
    ]
  }
};

// Check syntax for every javascript file in client and server folders
gulp.task('check-syntax', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Run check-syntax when any client or server files are modified
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['check-syntax']);
});

gulp.task('test', function() {
  return gulp.src(paths.tests.server, {read: false})
    .pipe(mocha({reporter: 'min'}));
});

gulp.task('build', ['check-syntax', 'test']);

// dynamic variables for angular
function makeConfig() {
  return gulp.src('.clientConfig.json')
    .pipe(gulpNgConfig('meatloaf.config', {
      // default environment to local
      environment: process.env.NODE_ENV || 'local'
    }));
}

gulp.task('config', function() {
  // concats the client app with config
  gulp.src('meatloaf/www/app.js')
    .pipe(addStream.obj(makeConfig())) // makeConfig is defined a few code blocks up
    .pipe(concat('app.js'))
    .pipe(gulp.dest('meatloaf/www/dist'));
});

// Start server using nodemon
gulp.task('serve', ['config'], function() {
  return nodemon({
    script: './server/server.js',
    ignore: 'node_modules/**/*.js'
  });
});


// This is the default gulp task (i.e. running gulp with no --options)
gulp.task('default', ['serve']);

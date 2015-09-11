// load env
require('dotenv').load();

// Gulp depencies
// ---------------------------------------
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha   = require('gulp-mocha');
var bs      = require('browser-sync'); // Delete this from npm
var sass    = require('gulp-sass');
var reload  = bs.reload;    // Delete this from npm
var concat = require('gulp-concat');

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
  // scss files
  style: [
    'meatloaf/www/style/scss/**/*.scss'
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

// Precompile scss files into css
gulp.task('sass', function(done) {
  gulp.src('./meatloaf/www/style/scss/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./meatloaf/www/style/css/'))
    // .pipe(minifyCss({
    //   keepSpecialComments: 0
    // }))
    // .pipe(rename({ extname: '.min.css' }))
    // .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Run check-syntax when any client or server files are modified
gulp.task('watch', function() {
  gulp.watch(paths.style, ['sass']);
});

gulp.task('test', function() {
  return gulp.src(paths.tests.server, {read: false})
    .pipe(mocha({reporter: 'min'}));
});

gulp.task('build', ['check-syntax', 'sass']);

// Start server using nodemon
gulp.task('serve', function() {
  return nodemon({
    script: './server/server.js',
    ignore: 'node_modules/**/*.js'
  });
});


// This is the default gulp task (i.e. running gulp with no --options)
gulp.task('default', ['serve']);

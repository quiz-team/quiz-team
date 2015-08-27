// Gulp depencies
// ---------------------------------------
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var bs      = require('browser-sync')
var reload  = bs.reload;



// the paths to our app files
var paths = {
  // client-side .js files
  scripts: [
    'client/**/*.js',
    'server/**/*.js'
  ],
  html: [
    'client/**/*.html'
  ],
  styles: [
    'client/styles/*.css'
  ]
};

// Check syntax for every javascript file in client and server folders
gulp.task('check-syntax', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Start server using nodemon
gulp.task('serve', function() {
  nodemon({script: './server/server.js', ignore: 'node_modules/**/*.js'});
});

// Runs nodemon server, and watches for file changes. Also provides external ip
gulp.task('start', ['serve'], function () {
  bs({
    notify: false,            // turn off annoying browser-sync pop-up
    injectChanges: true,      // reinject page changes to reloaded site
    files: [
      paths.scripts,
      paths.html,
      paths.styles
    ],
    proxy: 'localhost:9090'   // proxy our node server to an external ip with browser-sync
  });
});


// Run check-syntax when any client or server files are modified
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['check-syntax']);
  // Create LiveReload server
  livereload.listen();
});


// This is the default gulp task (i.e. running gulp with no --options)
gulp.task('default', ['start']);

var gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    concat = require('gulp-concat'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream');

var bases = {
    src: 'src/',
    dist: 'dist/',
    concat: 'dist/concat/',
    sample: 'sample/js/'
};

var paths = {
    main: ['sample/js/app.js'], // since we need to browserify this file specifically
    scripts: ['js/shell/*.js', 'js/support/*.js']

};
function onError(err) {
  console.log(err);
  this.emit('end');
}
gulp.task('default', function () {
    "use strict";
    var bundler = browserify({
            entries: [paths.main], // Only need initial file, browserify finds the deps
            transform: [reactify], // We want to convert JSX to normal javascript
            debug: false, // Gives us sourcemapping
            cache: {},
            packageCache: {},
            fullPaths: true // Requirement of watchify
        }),
        watcher  = watchify(bundler);

    return watcher.on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
          watcher.bundle()
            .on('error', onError)
            .pipe(source('main.js'))
            .pipe(gulp.dest(bases.concat + 'js/'))
            .pipe(gulp.dest(bases.sample));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    }).bundle() // Create the initial bundle when starting the task
        .pipe(source('main.js'))
        .pipe(gulp.dest(bases.concat + 'js/'));
});

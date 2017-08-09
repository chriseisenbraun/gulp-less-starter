var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
// Only work with new or updated files
var newer = require('gulp-newer');


// Compile Less into CSS & auto-inject into browsers
gulp.task('less', function(){
 return gulp.src('source/less/styles.less')
  .pipe(sourcemaps.init())
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
  .pipe(sourcemaps.write('sourcemaps'))
  .pipe(gulp.dest('public/css/'))
  .pipe(browserSync.stream());

});

// Static Server + watching less/html files
// https://browsersync.io/docs/gulp
gulp.task('watch', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("source/less/**/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);


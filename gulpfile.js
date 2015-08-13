var gulp = require('gulp'),
    compass = require('gulp-compass'),
    browserify = require('gulp-browserify'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify');

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['scss', 'js', 'html']);

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/html/**/*.html', ['html']);
});

gulp.task('scss', function() {
  gulp
    .src('src/scss/*.scss')
    .pipe(compass({
      style: 'compressed',
      css: 'public/assets/css/',
      sass: 'src/scss/'
    }))
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('js', function() {
  gulp
    .src('src/js/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .on('error', function(){})
    .pipe(uglify())
    .on('error', function(){})
    .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('html', function() {
  gulp
    .src('src/html/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public/'));
});

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
    return gulp.src(['gulpfile.js', 'src/*.js', 'test/*.js', 'test/test-module/*.js', 'bin/*'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
    return gulp.src('test/test.js', {read: false})
        .pipe(mocha());
});

gulp.task('default', ['lint', 'test']);

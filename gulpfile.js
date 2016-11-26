var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    stylus = require('gulp-stylus'),
    imageop = require('gulp-image-optimization');
gulp.task('default', ['connect', 'watch']);

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});
gulp.task('watch', function () {
    gulp.watch(['index.html'], ['html']);
    gulp.watch(['src/style/stylus/*.styl'], ['stylus']);
    gulp.watch(['src/style/css/*.css'], ['production-css']);
    gulp.watch(['src/js/*.js'], ['production-js']);
    gulp.watch(['src/img/*.js'], ['production-img']);
});
gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});
gulp.task('stylus', function () {
    return gulp.src('src/style/stylus/*.styl')
        .pipe(stylus()) 
        .pipe(gulp.dest('src/style/css/'))
        .pipe(connect.reload());
});

gulp.task('production-js', function () {
    return gulp.src(['src/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js/'));
});
gulp.task('production-css', function () {
    gulp.src(['src/style/css/*.css'])
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/style/'));
});
gulp.task('production-img', function () {
    gulp.src(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif', 'src/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 10,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/img/'));
});

'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    lazy: true,
});
var del = require('del');
var runSequence = require('run-sequence');

var config = {
    dist: 'dist/',
    port: 8100,
    src: 'src/',

    js: {
        src: [
            '**/*.js',
            '!**/*.spec.js',
        ],
    },
};

gulp.task('build:clean', function() {
    return del([config.dist]);
});

gulp.task('build:js', function() {
    return gulp.src(config.js.src, {cwd: config.src})
        .pipe(plugins.plumber())
        .pipe(plugins.changed(config.dist + config.src))
        .pipe(plugins.babel())
        .pipe(gulp.dest(config.dist + config.src));
});

gulp.task('lint:jscs', function() {
    return gulp.src(config.js.src, {cwd: config.src})
        .pipe(plugins.jscs())
        .on('error', function() {})
        .pipe(plugins.jscsStylish())
        .pipe(plugins.jscsStylish.combineWithHintResults());
});

gulp.task('lint:jshint', function() {
    return gulp.src(config.js.src, {cwd: config.src})
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('debug:watchers', function() {
    gulp.watch(config.src + '**/*.js', ['build:js', 'lint:jshint', 'lint:jscs']);
});

gulp.task('build', function(done) {
    runSequence(
        'build:clean',
        'build:js',
        'lint:jshint',
        'lint:jscs',
        done);
});

gulp.task('debug', ['build'], function() {
    gulp.start('debug:watchers');
});

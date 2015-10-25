import del from 'del';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';

let plugins = loadPlugins({
    laze: true,
});

let config = {
    dist: 'dist/',
    port: 8100,

    js: {
        src: 'src/**/*.js',
    },

    test: {
        src: 'test/**/*.js',
    },
};

gulp.task('build:clean', () => {
    return del([config.dist]);
});

gulp.task('test', () => {
    return gulp.src(config.test.src)
        .pipe(plugins.mocha({
            ui: 'bdd',
            reporter: 'spec',
        }));
});

gulp.task('build:js', () => {
    return gulp.src(config.js.src)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(config.js.src))
        .pipe(plugins.babel())
        .pipe(gulp.dest(config.dist));
});

gulp.task('lint:jscs', () => {
    return gulp.src(config.js.src)
        .pipe(plugins.jscs())
        .on('error', () => {})
        .pipe(plugins.jscsStylish())
        .pipe(plugins.jscsStylish.combineWithHintResults());
});

gulp.task('lint:jshint', () => {
    return gulp.src(config.js.src)
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('debug:watchers', () => {
    gulp.watch(config.js.src, ['build&test']);
});

gulp.task('build&test', ['build'], () => {
    gulp.start('test');
});

gulp.task('build', (done) => {
    runSequence(
        'build:clean',
        'build:js',
        'lint:jshint',
        'lint:jscs',
        done);
});

gulp.task('debug', ['build'], () => {
    gulp.start('debug:watchers');
});

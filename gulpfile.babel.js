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
    src: 'src/',

    js: {
        src: [
            '**/*.js',
            '!**/*.test.js',
        ],
        test: [
            '**/*.test.js',
        ],
    },
};

gulp.task('build:clean', () => {
    return del([config.dist]);
});

gulp.task('test', () => {
    return gulp.src(config.js.test, {cwd: config.src})
        .pipe(plugins.mocha({
            ui: 'bdd',
            reporter: 'spec',
        }));
});

gulp.task('build:js', () => {
    return gulp.src(config.js.src, {cwd: config.src})
        .pipe(plugins.plumber())
        .pipe(plugins.changed(config.dist + config.src))
        .pipe(plugins.babel())
        .pipe(gulp.dest(config.dist));
});

gulp.task('lint:jscs', () => {
    return gulp.src(config.js.src, {cwd: config.src})
        .pipe(plugins.jscs())
        .on('error', () => {})
        .pipe(plugins.jscsStylish())
        .pipe(plugins.jscsStylish.combineWithHintResults());
});

gulp.task('lint:jshint', () => {
    return gulp.src(config.js.src, {cwd: config.src})
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('debug:watchers', () => {
    gulp.watch(config.src + config.js.src, ['build:js', 'lint:jshint', 'lint:jscs', 'test']);
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

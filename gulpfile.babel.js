import del from 'del';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';

let plugins = loadPlugins({
    laze: true,
});

let config = {
    docs: 'docs/',
    dist: 'dist/',
    port: 8100,
    src: 'src/',
    test: 'test/',

    js: '**/*.js',
};

gulp.task('docs', () => {
    return gulp.src(config.src)
        .pipe(plugins.esdoc({
            destination: './' + config.docs,
            test: {
                type: 'mocha',
                source: config.test,
            },
        }));
});

gulp.task('build:clean', () => {
    return del([config.dist]);
});

gulp.task('test', () => {
    return gulp.src(config.js, {cwd: config.test})
        .pipe(plugins.mocha({
            ui: 'bdd',
            reporter: 'spec',
        }));
});

gulp.task('build:js', () => {
    return gulp.src(config.js, {cwd: config.src})
        .pipe(plugins.plumber())
        .pipe(plugins.changed(config.js, {cwd: config.src}))
        .pipe(plugins.babel())
        .pipe(gulp.dest(config.dist));
});

gulp.task('lint:jscs', () => {
    return gulp.src(config.js, {cwd: config.src})
        .pipe(plugins.jscs())
        .on('error', () => {})
        .pipe(plugins.jscsStylish())
        .pipe(plugins.jscsStylish.combineWithHintResults());
});

gulp.task('lint:jshint', () => {
    return gulp.src(config.js, {cwd: config.src})
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('debug:watchers', () => {
    gulp.watch(config.js, {cwd: config.src}, ['build&test']);
});

gulp.task('build&test', (done) => {
    runSequence(
        'build:js',
        'lint:jshint',
        'lint:jscs',
        'test',
        done);
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

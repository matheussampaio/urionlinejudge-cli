import del from 'del';
import gulp from 'gulp';
import yargs from 'yargs';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';

const argv = yargs
  .option('release', {
    description: 'Build a release version',
    type: 'boolean',
  })
  .option('fix', {
    description: 'Fix lint errors',
    type: 'boolean',
    default: false,
  })
  .argv;

const plugins = loadPlugins({
  laze: true,
});

const config = {
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
  return gulp.src(config.js, {
    cwd: config.test,
  })
  .pipe(plugins.mocha({
    ui: 'bdd',
    reporter: 'spec',
  }));
});

gulp.task('build:js', () => {
  return gulp.src(config.js, {
    cwd: config.src,
  })
  .pipe(argv.release ? plugins.util.noop() : plugins.plumber())
  .pipe(plugins.changed(config.js, {
    cwd: config.src,
  }))
  .pipe(plugins.babel({
    presets: ['es2015'],
  }))
  .pipe(gulp.dest(config.dist));
});

gulp.task('debug:watchers', () => {
  gulp.watch(config.js, {
    cwd: config.src,
  }, ['build:js', 'build:lint:src']);

  gulp.watch(config.js, {
    cwd: config.test,
  }, ['test', 'build:lint:test']);
});

function isFixed(file) {
  return file.eslint && file.eslint.fixed;
}

gulp.task('build:lint:src', () => {
  return gulp.src(config.js, { cwd: config.src })
  .pipe(plugins.eslint({
    fix: argv.fix,
  }))
  .pipe(plugins.eslint.format())
  .pipe(plugins.if(isFixed, gulp.dest(config.src)))
  .pipe(argv.release ? plugins.eslint.failAfterError() : plugins.util.noop());
});

gulp.task('build:lint:test', () => {
  return gulp.src(config.js, { cwd: config.test })
  .pipe(plugins.eslint({
    fix: argv.fix,
  }))
  .pipe(plugins.eslint.format())
  .pipe(plugins.if(isFixed, gulp.dest(config.test)))
  .pipe(argv.release ? plugins.eslint.failAfterError() : plugins.util.noop());
});

gulp.task('package', () => {
  gulp.src('./package.json')
    .pipe(plugins.jsonEditor({
      'debug': !argv.release,
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('build', (done) => {
  runSequence(
    // 'package',
    'build:clean',
    'build:js',
    'build:lint:src',
    'build:lint:test',
    done);
});

gulp.task('debug', ['build'], () => {
  gulp.start('debug:watchers');
});

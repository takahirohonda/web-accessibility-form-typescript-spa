const gulp = require('gulp');
const imgmin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const runSequence = require('gulp4-run-sequence');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const lazypipe = require('lazypipe');
const order = require('gulp-order');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const rollupUglify = require('rollup-plugin-uglify').uglify;
const rollupNodeResolve = require('rollup-plugin-node-resolve');

// Default task only gets executed when typed only gulp
gulp.task('default', async () => {
  console.log('Please add the task name. Default task is not defined.');
});

// (1) Moving all html to dist folder
gulp.task('copyAllHTML', async function()  {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// (2) Moving images to dist img folder
gulp.task('minifyImgs', function(done) {
  gulp.src('src/img/**/*')
    .pipe(imgmin())
    .pipe(gulp.dest('dist/img'));
  done();
});

// (3) Moving vendor css to dist css foler
gulp.task('copyVendorCSS', async function()  {
  gulp.src('src/vendor/css/*.min.css')
    .pipe(gulp.dest('dist/css'));
});

// (4) minify CSS
gulp.task('minifyCss', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// (5) css build
gulp.task('css', (callback) => {
  runSequence('copyVendorCSS', 'minifyCss', callback);
});

// (6) Compile TypeScript
gulp.task('compileTs', () => {
  return rollup.rollup({
    input: './src/ts/main.ts',
    plugins: [
      rollupTypescript({
        cacheRoot: '.rollupcache',
        tsconfigOverride: {
          compilerOptions: {
            removeComments: true,
          }
        }
      }),
      rollupNodeResolve({}),
      rollupUglify({
        compress: {
          drop_console: false
        }
      })
    ]
  }).then(bundle => {
    return bundle.write({
      file: 'dist/scripts/main.min.js',
      format: 'iife',
      // add mdh namespace
      name: 'mdh',
      extend: false,
      sourcemap: false
    });
  });
});

// (7) Moving to git.io folder
gulp.task('moveToGitIo', (callback) => {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('../mydatahack.github.io/accessibility-form/'));
})

// (8) Production bild
gulp.task('build:prod', (callback) => {
  runSequence(['copyAllHTML', 'css', 'minifyImgs', 'compileTs'], 'moveToGitIo', callback);
});

// Watch source file change and reload browser for development
gulp.task('watch', () => {
  browserSync.init({
    server: './dist',
    port:8080,
    ui: {port: 8081}
  });

  gulp.watch('src/ts/**/*.ts', gulp.series('compileTs'));
  gulp.watch('src/*.html', gulp.series('copyAllHTML'));
  gulp.watch('src/img/**/*', gulp.series('minifyImgs'));
  gulp.watch('src/css/**/*.css', gulp.series('css'));

  //reloader
  gulp.watch('dist/scripts/**/*.js').on('change', browserSync.reload);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
  gulp.watch('dist/img/**/*').on('change', browserSync.reload);
  gulp.watch('dist/css/**/*.css').on('change', browserSync.reload);
});

gulp.task('checkDist', function() {
  browserSync.init({
    server: './dist',
    port:8080,
    ui: {port: 8081}
  });
});

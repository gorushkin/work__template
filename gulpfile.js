"use strict";

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  plumber = require("gulp-plumber"),
  postcss = require('gulp-postcss'),
  cssNano = require('cssnano'),
  server = require('browser-sync').create(),
  cleancss = require('clean-css'),
  csso = require('csso'),
  autoprefixer = require('autoprefixer'),
  processpres = [cssNano];

const css = () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss(processpres))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());

const copy = () => gulp.src([
    'source/*.html',
    'source/js/**',
    'source/img/**',
    'source/fonts/**',
    "source/pp/**"
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));

const refresh = (done) => {
  server.reload();
  done();
}

const clean = () => del('build');
const watchHtml = () => gulp.watch('source/*.html', copy);
const watchStyle = () => gulp.watch('source/sass/**/*.{scss,sass}', css);
const watchScript = () => gulp.watch('source/js/*.*', copy);
const browserSync = server.init({
  server: {
    baseDir: "build/"
  }
});

const watch = () => {
  browserSync;
  gulp.watch('source/*.html', gulp.series(copy, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', css);
  gulp.watch('source/js/*.*', gulp.series(copy, refresh));
}




const build = gulp.series(clean, gulp.parallel(css, copy));
// const watch = gulp.parallel(watchHtml, watchStyle, watchScript);
const start = gulp.series(build, watch);

gulp.task('css', () => css());
gulp.task('clean', () => clean());
gulp.task('copy', () => copy());

gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('start', start);

exports.default = start;

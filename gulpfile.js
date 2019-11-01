"use strict";

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  plumber = require("gulp-plumber"),
  postcss = require('gulp-postcss'),
  cssNano = require('cssnano'),
  server = require('browser-sync').create(),
  autoprefixer = require('autoprefixer'),
  gulpZip = require('gulp-zip'),
  // fs = require('fs'),
  path = require('path'),
  name = path.basename(__dirname),
  zipFolder = 'C:/Users/Alex/Documents/artyom/webdev/залить',

  processpres = [autoprefixer, cssNano];

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
};

const clean = () => del('build');

const watch = () => {
  server.init({
    server: {
      baseDir: "build/"
    }
  });
  gulp.watch('source/*.html', gulp.series(copy, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', css);
  gulp.watch('source/js/*.*', gulp.series(copy, refresh));
};


const zip = () => gulp.src('build/**')
  .pipe(gulpZip(name + '.zip'))
  .pipe(gulp.dest(zipFolder));

const build = gulp.series(clean, gulp.parallel(css, copy));
const start = gulp.series(build, watch);

gulp.task('css', () => css());
gulp.task('clean', () => clean());
gulp.task('copy', () => copy());
gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('start', start);
gulp.task('zip', zip);

// exports.default = clean;

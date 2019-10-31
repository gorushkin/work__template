"use strict";

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  plumber = require("gulp-plumber"),
  autoprefixer = require('autoprefixer');

const css = () => gulp.src('source/sass/style.scss')
  .pipe(sass({
    "sourcemap=none": true,
    noCache: true,
    compass: true,
    style: sassStyle,
    lineNumbers: false
  }))
  .pipe(gulp.dest("build/css"));

exports.default = css;

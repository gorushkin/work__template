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
  include = require('gulp-include'),
  obfuscator = require('gulp-javascript-obfuscator'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  path = require('path'),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  imgCompress = require('imagemin-jpeg-recompress'),
  name = path.basename(__dirname),
  zipFolder = 'C:/Users/Alex/Documents/artyom/webdev/залить',

  processpres = [
    autoprefixer,
    cssNano,
  ];

const css = () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: [__dirname + '/node_modules']
  }))
  .pipe(postcss(processpres))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());

const copy = () => gulp.src([
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
  gulp.watch('source/*.html', gulp.series(html, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', css);
  gulp.watch('source/js/**/*.*', gulp.series(js, refresh));
};

const images = () => gulp.src('source/img — src/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imgCompress({
      loops: 4,
      min: 70,
      max: 80,
      quality: 'high'
    }),
    imagemin.optipng({
      optimizationLevel: 3
    }),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('source/img'));


const webpOpt = () => gulp.src('source/img — src/**/*.{png,jpg,svg}')
  .pipe(webp({
    quality: 70
  }))
  .pipe(gulp.dest("source/img"));

const zip = () => gulp.src('build/**')
  .pipe(gulpZip(name + '.zip'))
  .pipe(gulp.dest(zipFolder));

const vendorJs = () => gulp.src('source/js/vendor/*.js')
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('build/js'));

const modulesJs = () => gulp.src('source/js/modules/*.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest('build/js'));

const js = gulp.parallel(vendorJs, modulesJs);

const html = () => gulp.src('source/*.html')
  .pipe(include())
  .pipe(gulp.dest('build'));

const build = gulp.series(clean, gulp.parallel(js, css, copy, html));
const start = gulp.series(build, watch);

gulp.task('css', () => css());
gulp.task('js', js);
// gulp.task('vendorJs', () => vendorJs());
// gulp.task('modulesJs', () => modulesJs());
gulp.task('clean', () => clean());
gulp.task('copy', () => copy());
gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('start', start);
gulp.task('zip', zip);
gulp.task('images', images);
gulp.task('webp', webpOpt);
gulp.task('html', html);

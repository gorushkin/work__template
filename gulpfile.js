"use strict";

const path = {
  build: {
    css: "build/css",
    img: 'source/img',
    js: 'build/js',
  },
  src: {
    css: 'source/sass/style.scss',
    img: 'source/img/**',
    fonts: 'source/fonts/**',
    imgsrc: 'source/img — src/**/*.{png,jpg,svg}',
    pp: "source/pp/**",
    jsModules: 'source/js/modules/*.js',
    jsVendors: 'source/js/vendor/*.js',
    html: 'source/*.html',
  },
  watch: {
    html: 'source/*.html',
    htmlTemplates: 'source/templates/*.html',
    css: 'source/sass/**/*.{scss,sass}',
    js: 'source/js/**/*.*',
  },
  zipFolder: 'C:/Users/Alex/Documents/artyom/webdev/залить',
}


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
  pathNpm = require('path'),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  imgCompress = require('imagemin-jpeg-recompress'),
  name = pathNpm.basename(__dirname),

  processpres = [
    autoprefixer,
    cssNano,
  ];

const css = () => gulp.src(path.src.css)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: [__dirname + '/node_modules']
  }))
  .pipe(postcss(processpres))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.build.css))
  .pipe(server.stream());

const copy = () => gulp.src([
    path.src.img,
    path.src.fonts,
    path.src.pp
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
  gulp.watch(path.watch.html, gulp.series(html, refresh));
  gulp.watch(path.watch.htmlTemplates, gulp.series(html, refresh));
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.js, gulp.series(js, refresh));
};

const images = () => gulp.src(path.src.imgsrc)
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
  .pipe(gulp.dest(path.build.img));

const webpOpt = () => gulp.src(path.src.imgsrc)
  .pipe(webp({
    quality: 70
  }))
  .pipe(gulp.dest(path.build.img));

const zip = () => gulp.src('build/**')
  .pipe(gulpZip(name + '.zip'))
  .pipe(gulp.dest(path.zipFolder));

const vendorJs = () => gulp.src(path.src.jsVendors)
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest(path.build.js));

const modulesJs = () => gulp.src(path.src.jsModules)
  .pipe(concat('main.js'))
  .pipe(gulp.dest(path.build.js));

const js = gulp.parallel(vendorJs, modulesJs);

const html = () => gulp.src(path.src.html)
  .pipe(include())
  .pipe(gulp.dest('build'));

const build = gulp.series(clean, gulp.parallel(js, css, copy, html));
const start = gulp.series(build, watch);

gulp.task('css', () => css());
gulp.task('js', js);
gulp.task('clean', () => clean());
gulp.task('copy', () => copy());
gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('start', start);
gulp.task('zip', zip);
gulp.task('images', images);
gulp.task('webp', webpOpt);
gulp.task('html', html);


const path = {
  build: {
    css: 'build/css',
    scss: 'build/scss',
    img: 'source/img',
    js: 'build/js',
  },
  src: {
    css: 'source/sass/style.scss',
    img: 'source/img/**',
    fonts: 'source/fonts/**',
    scss: 'source/sass/**/*.*',
    imgsrc: 'source/img — src/**/*.{png,jpg,svg}',
    pp: 'source/pp/**',
    jsModules: 'source/js/modules/*.js',
    jsVendors: 'source/js/vendor/*.js',
    html: 'source/*.html',
  },
  watch: {
    html: 'source/*.html',
    htmlTemplates: 'source/templates/*.html',
    css: 'source/sass/**/*.{scss,sass}',
    js: 'source/js/**/*.*',
    img: 'source/img/**',
  },
  zipFolder: 'C:/Users/Alex/Documents/artyom/webdev/залить',
};


const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const cssNano = require('cssnano');
const server = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const gulpZip = require('gulp-zip');
const include = require('gulp-include');
// const obfuscator = require('gulp-javascript-obfuscator');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify-es').default;
const pathNpm = require('path');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const imgCompress = require('imagemin-jpeg-recompress');

const name = pathNpm.basename(__dirname);

const processpres = [
  autoprefixer,
  cssNano,
];

const css = () => gulp.src(path.src.css)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: [`${__dirname}/node_modules`],
  }))
  .pipe(postcss(processpres))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.build.css))
  .pipe(server.stream());

const copy = () => gulp.src([
  path.src.img,
  path.src.fonts,
  path.src.pp,
  path.src.scss,
], {
  base: 'source',
})
  .pipe(gulp.dest('build'));

const refresh = (done) => {
  server.reload();
  done();
};

const clean = () => del('build');

const images = () => gulp.src(path.src.imgsrc)
  .pipe(imagemin([
    imgCompress({
      loops: 4,
      min: 70,
      max: 80,
      quality: 'high',
    }),
    imagemin.optipng({
      optimizationLevel: 3,
    }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest(path.build.img));

const webpOpt = () => gulp.src(path.src.imgsrc)
  .pipe(webp({
    quality: 70,
  }))
  .pipe(gulp.dest(path.build.img));

const zip = () => gulp.src('build/**')
  .pipe(gulpZip(`${name}.zip`))
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

const watch = () => {
  server.init({
    server: {
      baseDir: 'build/',
    },
  });
  gulp.watch(path.watch.html, gulp.series(html, refresh));
  gulp.watch(path.watch.htmlTemplates, gulp.series(html, refresh));
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.img, gulp.series(copy, refresh));
  gulp.watch(path.watch.js, gulp.series(js, refresh));
};

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

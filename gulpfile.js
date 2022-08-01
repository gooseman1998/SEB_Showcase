const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");

const sass_src = "assets/styles/scss/**/*.scss";
const sass_src_main = "assets/styles/scss/main.scss";
const css_dest = "assets/dist/css";

const js_src = "assets/scripts/*.js";
const js_dest = "assets/dist/scripts";

gulp.task('sass', function () {
    return gulp
        .src(sass_src_main)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(css_dest));
});

gulp.task('script', function () {

    return gulp
        .src(js_src)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(js_dest));
});



gulp.task('default', function () {
    gulp.parallel('sass','script');
    // gulp.parallel('sass');
    gulp.watch(sass_src, { usePolling: true }, gulp.parallel("sass"));
    gulp.watch(js_src, { usePolling: true }, gulp.parallel("script"));
});
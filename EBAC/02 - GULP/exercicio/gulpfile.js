const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sass({
            style: 'compressed' 
        }).on('error', sass.logError)) 
        .pipe(gulp.dest('./build/styles'));
}

function comprimeImagens() {
    return gulp.src('./source/images/**/*') 
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}

exports.default = gulp.parallel(compilaSass, comprimeImagens, comprimeJavaScript);

exports.watch = function() {
    gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/**/*', gulp.series(comprimeImagens));
}
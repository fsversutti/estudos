const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/**/*') // O '**/*' pega todas as subpastas e arquivos
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'compressed' // Em vez de outputStyle
        }).on('error', sass.logError)) // Adicione isso para ver erros no console
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
    setTimeout(function() {
        console.log("Executando via Gulp");
        callback();

    }, 2000);
}

function dizOi(callback) {
    setTimeout(function(){
        console.log("Olá Gulp");
        dizTchau();
        callback();

    }, 1000);
}

function dizTchau() {
    console.log("Tchau Gulp")
}

// exports.default = gulp.series(funcaoPadrao, dizOi);
exports.default = gulp.parallel(funcaoPadrao, dizOi);
exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial:false}, gulp.series(compilaSass));
}
exports.javascript = comprimeJavaScript;
exports.images = comprimeImagens
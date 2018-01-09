const gulp         = require('gulp');
const sass         = require('gulp-sass');
const plumber      = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const browserSync  = require('browser-sync').create();



const handleError = function(err) {
    console.log(err.toString());
    this.emit('end');
}



gulp.task('browser-sync', function() {
    browserSync.init({
        //notify: false;  //nie pokazuj w prawym gornym rogu info
        //open: false; //nie otwieraj automatycznie
        server: {
            baseDir: "./"
        }
    });
});



gulp.task('sass', function () {
    console.log("rozpoczynam kompilacje scss");
    return gulp.src('./scss/style.scss')
        .pipe(plumber({errorHandler: handleError}))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle : 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['> 5%']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});



//obserwujemy zmiany w plikach
gulp.task('watch', function () {
        gulp.watch('./scss/**/*.scss', ['sass']);
        gulp.watch("./*.html").on('change', browserSync.reload);
});



gulp.task('default', function (){
    console.log('Rozpoczynam prace');
    gulp.start(['sass', 'watch', 'browser-sync']);
})

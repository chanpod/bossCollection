var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

/**
 * Tasks
 * 
 * concatJS //Concats all js files
 * concatSass //Concats all sass files
 * css    //Converts scss to css
 * clean  //deletes all tmp files
 * minify //minifies js files in tmp
 * minifyCss //minifies css files in tmp
 */

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('watch', function(){
    
    watch([
        './app/public/js/**/*.js', 
        './app/public/js/**/*.sass',
        '!./app/public/js/tmp/**'
        ], batch(function (events, done) {
        gulp.start('build', done);
    }));

//    gulp.watch('./app/public/js/**/*.js', ['build']);
        
   //gulp.watch('./app/public/js/**/*.sass', ['build']);
})

gulp.task('build', function(){
    //['clean', 'concatJS', 'concatSass', 'css', 'cssRename', 'minify', 'minifyCss']
    
    runSequence('clean', 'concatJS', 'concatSass', 'css', 'cssRename', 'minify', 'minifyCss', 'vendorCss');
})

/**
gulp.task('templates', function(){
    
    gulp.src('./app/views/index.jade')
        .pipe(jade({
            
        }))
        .pipe(gulp.dest('./app/views/'))
});

 */


gulp.task('concatVendor', function(){
    
    return gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-cookies/angular-cookies.min.js',
        './node_modules/angular-resource/angular-resource.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-messages/angular-messages.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-material/angular-material.min.js',
        './app/public/js/vendor/angular-parallax.js',
        './app/public/js/lib/jquery-2.1.1.js',
        './app/public/js/lib/underscoreJS.js',
        './app/public/js/lib/materialize/js/materialize.min.js',
        './app/public/js/lib/angular-socket-io-master/mock/socket-io.js',
        './app/public/js/lib/angular-socket-io-master/socket.js',
        './app/public/js/lib/socket.io.js',        
    ])
            .pipe(concat('vendor.min.js'))
            .pipe(gulp.dest('./app/public/tmp/'))
})

gulp.task('concatJS', function () {

    return gulp.src([
        './app/public/js/app.js',
        './app/public/js/controllers/**/*.module.js',
        './app/public/js/controllers/**/*.js',
        './app/public/js/directives/**/*.module.js',
        './app/public/js/directives/**/*.js',
        './app/public/js/filters/**/*.module.js',
        './app/public/js/filters/**/*.js',
        './app/public/js/services/**/*.module.js',
        './app/public/js/services/**/*.js'
    ])
        .pipe(concat('bosscollection.js'))
        .pipe(gulp.dest('./app/public/tmp/'));


})

gulp.task('vendorCss', function(){
    
    return gulp.src([
        './node_modules/angular-material/angular-material.min.css'
    ])
        .pipe(concat('angular-material.min.css'))
        .pipe(gulp.dest('./app/public/tmp/'));
})

gulp.task('concatSass', function () {


    return gulp.src([
        './app/public/css/**/*.scss',
    ])
        .pipe(concat('compiled.scss'))
        .pipe(gulp.dest('./app/public/css/'));
})

gulp.task('css', function () {

    return gulp.src('./app/public/css/compiled.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/public/tmp/'));
})

gulp.task('cssRename', function () {

    return gulp.src('./app/public/tmp/compiled.css')
        .pipe(rename('bosscollection.min.css'))
        .pipe(gulp.dest('./app/public/tmp'));
})

gulp.task('clean', function () {
    
   return gulp.src([
        './app/public/tmp/*.js',
        '!./app/public/tmp/vendor.min.js',
        './app/public/tmp/*.css'
    ], { read: false })
        .pipe(clean());
});

gulp.task('minify', function () {

    return gulp.src(
        [
            './app/public/tmp/*.js',
            '!./app/public/tmp/vendor.min.js'
            ])
        .pipe(minify())
        .pipe(gulp.dest('./app/public/tmp'));
})

gulp.task('minifyCss', function () {

    return gulp.src('./app/public/tmp/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./app/public/tmp/'));
});
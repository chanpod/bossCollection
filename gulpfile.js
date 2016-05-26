require('es6-promise').polyfill();
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
var babel = require("gulp-babel");
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var jadeConcat = require('gulp-jade-template-concat');
var prettify = require('gulp-js-prettify');


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

gulp.task('watch', function () {

    watch([
        './app/public/css/**/*.scss',
        './app/public/components/**/*.scss',
        '!./app/public/css/compiled.scss',
        './app/public/js/**/*.sass',
        '!./app/public/js/tmp/**'
    ], batch(function (events, done) {
        gulp.start('concatSass', done);
    }));

    gulp.watch(["./app/public/js/**/*.js", './app/public/components/**/*.js', '!./app/public/js/tmp/**']).on('change', batch(function (events, done) {
        gulp.start('JS', done);
    }));

    gulp.watch("app/**/*.jade").on('change', batch(function (events, done) {
        gulp.start('concatJade', done);
    }));

    browserSync.init({
        proxy: "localhost:4000",
        logFileChanges: false,
    })
})

gulp.task("JS", function () {
    runSequence('concatJS', 'browserify');
})

gulp.task("CSS", function () {
    runSequence('concatSass', 'css', 'cssRename');
})

gulp.task('build', function () {

    runSequence('clean', 'concatJade', 'concatJS', 'browserify', 'concatSass', 'vendorCss', 'concatVendor');
})

gulp.task('browserify', function () {
    // Grabs the app.js file
    return browserify('./app/public/tmp/bosscollection.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./app/public/tmp/'))
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(browserSync.stream());
})

gulp.task("concatJade", function () {
    var YOUR_LOCALS = {};
    gulp.src('./app/views/index.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./app/views/'))
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(browserSync.stream());
});

gulp.task('concatVendor', function () {

    return gulp.src([
        './node_modules/lodash/lodash.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-cookies/angular-cookies.min.js',
        './node_modules/angular-resource/angular-resource.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-messages/angular-messages.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/showdown/dist/showdown.min.js',
        './node_modules/angular-material/angular-material.min.js',
        './node_modules/moment/min/moment.min.js',
        './node_modules/highcharts/highcharts.js',
        './node_modules/highcharts/highcharts-more.js',
        './node_modules/highcharts/modules/data.js',
        './node_modules/highcharts/modules/drilldown.js',
        './node_modules/highcharts/modules/exporting.js',
        './node_modules/highcharts/modules/solid-gauge.js'

    ])
        .pipe(concat('vendor.js'))
        .pipe(minify())
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./app/public/tmp/'))
})

gulp.task('concatJS', function () {

    return gulp.src([
        './app/public/js/app.js',
        './app/public/components/**/*.module.js',
        './app/public/components/**/*.js',
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
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(prettify({collapseWhitespace: true}))
        .pipe(gulp.dest('./app/public/tmp/'))

        .pipe(minify())
        .pipe(rename('bosscollection.min.js'))
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./app/public/tmp/'))
        


})

gulp.task('vendorCss', function () {

    return gulp.src([
        './node_modules/angular-material/angular-material.min.css'
    ])
        .pipe(concat('angular-material.min.css'))
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./app/public/tmp/'));
})

gulp.task('concatSass', function () {


    return gulp.src([

        './app/public/css/**/*.scss',
        './app/public/components/**/*.scss'
    ])
        .pipe(concat('compiled.scss'))
        .pipe(sass())
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./app/public/css/'))
        .pipe(cssnano())
        .pipe(rename('bosscollection.min.css'))
        .pipe(gulp.dest('./app/public/tmp/'))
        .pipe(browserSync.stream());
})

gulp.task('clean', function () {

    return gulp.src([
        './app/public/tmp/*.js',
        './app/public/css/compiled.scss',
        '!./app/public/tmp/vendor-min.js',
        './app/public/tmp/*.css'
    ], { read: false })
        .pipe(clean());
});
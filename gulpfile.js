'use strict';

// Modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    typescript = require('gulp-typescript');

// Config
var tsProject = typescript.createProject('tsconfig.json'),
    processors = [autoprefixer, cssnano],
    config = {
        path: {
            dev: 'dev/',
            dist: 'app/',
            production: 'production/',
            assets: 'assets/',
            modules: 'node_modules/',
            libs: 'libs/app'
        }
    },
    libs = [
        'systemjs/dist/system-polyfills.js',
        'es6-shim/es6-shim.min.js',
        'angular2/es6/dev/src/testing/shims_for_IE.js',
        'angular2/bundles/angular2-polyfills.js',
        'systemjs/dist/system.src.js',
        'rxjs/bundles/Rx.js',
        'angular2/bundles/angular2.dev.js',
        'angular2/bundles/router.dev.js',
        'angular2/bundles/http.js',
        'ng2-material/dist/ng2-material.min.js'
    ];

//Tasks
gulp.task('build-html', function () {
    return gulp.src(config.path.dev + '**/*.html')
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('copy-libs', function () {
    for (var i = 0; i <= libs.length; i++) {
        gulp.src(config.path.modules + libs[i])
            .pipe(gulp.dest(config.path.dist + 'libs/'))
    }
});

gulp.task('process-images', function () {
    return gulp.src(config.path.assets + 'img/**/*.{jpg,jpeg,png,gif}')
        .pipe(changed(config.path.dist + 'img/'))
        .pipe(gulp.dest(config.path.dist + 'img/'));
});

gulp.task('optimize-images', function () {
    return gulp.src(config.path.assets + 'img/**/*.{jpg,jpeg,png,gif}')
        .pipe(imagemin({optimizationLevel: 3, progessive: true, interlaced: true}))
        .pipe(gulp.dest(config.path.dist + 'img/'));
});

gulp.task('global-css', function () {
    return gulp.src(config.path.assets + 'scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.dist + 'styles/'));
});

gulp.task('component-css', function () {
    return gulp.src(config.path.dev + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('build-ts', function () {
    return gulp.src(config.path.dev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('watch', function () {
    gulp.watch(config.path.dev + '**/*.ts', ['build-ts']);
    gulp.watch(config.path.dev + '**/*.html', ['build-html']);
    gulp.watch(config.path.assets + 'scss/**/*.scss', ['global-css']);
    gulp.watch(config.path.dev + '**/*.scss', ['component-css']);
    gulp.watch(config.path.assets + 'img/**/*.{jpg,jpeg,png,gif}', ['process-images']);
});

gulp.task('cleanup', function () {
    return gulp.src([config.path.dist, config.path.production], {read: false, force: true})
        .pipe(clean());
});

gulp.task('default', ['watch', 'copy-libs', 'build-ts', 'build-html', 'global-css', 'component-css',
 'process-images']);
gulp.task('wipe', ['cleanup']);

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// SCSS to CSS
gulp.task('styles', () => {
    return gulp.src('src/scss/**/*.scss')  // Adjust if your SCSS files are located differently
        .pipe(sourcemaps.init())  // Initialize sourcemap
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Compile SCSS to compressed CSS
        .pipe(sourcemaps.write())  // Write sourcemap
        .pipe(gulp.dest('dist/css'))  // Output directory, adjust if needed
        .pipe(browserSync.stream());
});

// JavaScript transpile and compress
gulp.task('scripts', () => {
    return gulp.src('src/js/**/*.js')  // Adjust if your source JS files are located differently
        .pipe(sourcemaps.init())  // Initialize sourcemap
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))  // Transpile JavaScript for backward compatibility
        .pipe(uglify())  // Compress JavaScript
        .pipe(sourcemaps.write())  // Write sourcemap
        .pipe(gulp.dest('dist/js'))  // Output directory, adjust if needed
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', () => {
    browserSync.init({
        proxy: "http://localhost/php-relearning/", // Your local development URL
        open: false
    });
    gulp.watch('src/scss/**/*.scss', gulp.series('styles')); // Watch SCSS files
    gulp.watch('src/js/**/*.js', gulp.series('scripts')); // Watch JS files
    gulp.watch('**/*.php').on('change', browserSync.reload); // Watch PHP files and reload
});

gulp.task('default', gulp.series('styles', 'scripts', 'watch'));  // Default task

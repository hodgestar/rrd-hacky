var gulp = require('gulp'),
    sourceMaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass');

var srcPath = 'src/**.ts*',
    jsBuildPath = 'js',
    sassPath = 'sass/**.scss',
    sassBuildPath = 'css';

gulp.task('build', ['build-ts', 'build-sass']);

gulp.task('build-ts', function () {
  return gulp.src([srcPath, 'typings/tsd.d.ts'])
    .pipe(sourceMaps.init())
    .pipe(typescript('tsconfig.json'))
    .pipe(babel({presets: "es2015"}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(jsBuildPath));
});

gulp.task('build-sass', function () {
    return gulp.src([sassPath])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(sassBuildPath));
})

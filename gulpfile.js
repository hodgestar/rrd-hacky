var gulp = require('gulp'),
    sourceMaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    babel = require('gulp-babel');

var srcPath = 'src/**.ts*';
var jsBuildPath = 'js';

gulp.task('build', function () {
  return gulp.src([srcPath, 'typings/tsd.d.ts'])
    .pipe(sourceMaps.init())
    .pipe(typescript('tsconfig.json'))
    .pipe(babel({presets: "es2015"}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(jsBuildPath));
});

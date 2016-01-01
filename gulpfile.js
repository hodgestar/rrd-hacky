var gulp = require('gulp'),
    sourceMaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    gls = require('gulp-live-server'),
    open = require('gulp-open');

var srcPath = 'src/**.ts*',
    jsBuildPath = 'js',
    typingsPath = 'typings/tsd.d.ts',
    jsOutputPath = jsBuildPath + '/**.js',
    sassPath = 'sass/**.scss',
    sassBuildPath = 'css',
    sassOutputPath = sassBuildPath + '/**.css';

gulp.task('build', ['build-ts', 'build-sass']);

gulp.task('build-ts', function () {
  return gulp.src([srcPath, typingsPath])
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
});

gulp.task('watch-ts', ['build-ts'], function() {
    return gulp.watch([srcPath, typingsPath], function(event) {
        gulp.src([event.path, typingsPath])
            .pipe(sourceMaps.init())
            .pipe(typescript('tsconfig.json'))
            .pipe(babel({presets: "es2015"}))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest(jsBuildPath));
    });
});

gulp.task('watch-sass', ['build-sass'], function() {
   return gulp.watch([sassPath], function(event) {
       gulp.src([event.path])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(sassBuildPath));
   }); 
});

gulp.task('serve', ['watch-ts', 'watch-sass'], function() {
    var server = gls.static('.', 8080);
    server.start();
    
    return gulp.watch([jsOutputPath, sassOutputPath, 'index.html'], function(event) {
        server.notify.apply(server, [event]);        
    });
});

gulp.task('run', ['serve'], function() {
    var options = {
        uri: 'http://localhost:8080',
        app: 'google chrome'
    };
    return gulp.src(__filename)
        .pipe(open(options)); 
});


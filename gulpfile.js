var gulp = require('gulp'),
    sourceMaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    gls = require('gulp-live-server'),
    open = require('gulp-open'),
    del = require('del'),
    newer = require('gulp-newer'),
    addSrc = require('gulp-add-src'),
    plumber = require('gulp-plumber');

var srcPath = 'src/**.ts*',
    jsBuildPath = 'js',
    jsOutputPath = jsBuildPath + '/**.js',
    typingsPath = 'typings/tsd.d.ts',
    sassPath = 'sass/**.scss',
    sassBuildPath = 'css',
    sassOutputPath = sassBuildPath + '/**.css';

gulp.task('clean', ['clean-ts', 'clean-sass']);

gulp.task('clean-ts', function() {
    return del([jsOutputPath]);
});

gulp.task('clean-sass', function() {
    return del([sassOutputPath]);
});

gulp.task('build', ['build-ts', 'build-sass']);
gulp.task('rebuild', ['rebuild-ts', 'rebuild-sass']);

function buildTS() {
    return gulp.src([srcPath])
        .pipe(plumber())
        .pipe(newer({ dest: jsBuildPath, ext: '.js' }))
        .pipe(addSrc(typingsPath))
        .pipe(sourceMaps.init())
        .pipe(typescript('tsconfig.json'))
        .pipe(babel({presets: "es2015"}))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(jsBuildPath));
}

gulp.task('build-ts', buildTS);
gulp.task('rebuild-ts', ['clean-ts'], buildTS);

function buildSass() {
    return gulp.src([sassPath])
        .pipe(plumber())
        .pipe(newer({ dest: sassBuildPath, ext: '.css'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(sassBuildPath));
}

gulp.task('build-sass', buildSass);
gulp.task('rebuild-sass', ['clean-sass'], buildSass);

gulp.task('watch-ts', ['build-ts'], function() {
    return gulp.watch([srcPath, typingsPath], function(event) {
        gulp.src([event.path, typingsPath])
            .pipe(plumber())
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
            .pipe(plumber())
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(sassBuildPath));
   }); 
});

gulp.task('serve', ['watch-ts', 'watch-sass'], function() {
    var server = gls.static('.', 24680);
    server.start();
    
    return gulp.watch([jsOutputPath, sassOutputPath, 'index.html'], function(event) {
        server.notify.apply(server, [event]);        
    });
});

gulp.task('run', ['serve'], function() {
    var options = {
        uri: 'http://localhost:24680',
        app: 'google chrome'
    };
    return gulp.src(__filename)
        .pipe(open(options)); 
});


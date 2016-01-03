var gulp = require('gulp'),
    sourceMaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    gls = require('gulp-live-server'),
    open = require('gulp-open'),
    del = require('del'),
    newer = require('gulp-newer'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    through = require('through2').obj,
    lazypipe = require('lazypipe');

var srcPath = 'src/**/*.ts*',
    jsBuildPath = 'js',
    jsOutputPath = jsBuildPath + '/**/*.js',
    typingsPath = 'typings/tsd.d.ts',
    sassPath = 'sass/**/*.scss',
    sassBuildPath = 'css',
    sassOutputPath = sassBuildPath + '/**/*.css';

function onError(err) { 
    gutil.beep();
    gutil.log(gutil.colors.underline(gutil.colors.red('ERROR:')),
        gutil.colors.cyan(err.plugin), '-', err.message);
    this.emit('end');
};

function ifNonEmptyAddFiles(paths) {
    var added = false;
    return through(function(file, encoding, done) {
        if(!added) {
            added = true;
            paths.map(function(path, i, pathArr) {
                this.push(new gutil.File({ cwd: "", base: "", path: path, contents: fs.readFileSync(path) }));
            }, this);   
        }
        this.push(file);
        done();
    });
} 

gulp.task('clean', ['clean-ts', 'clean-sass']);

gulp.task('clean-ts', function() {
    gutil.log('clean-ts', jsOutputPath);
    return del([jsOutputPath])
        .then(paths => {
            gutil.log('clean-ts: ', jsOutputPath, '\nDeleted files and folders:\n' + paths.join('\n'));
        });
});

gulp.task('clean-sass', function() {
    return del([sassOutputPath])
        .then(paths => {
            gutil.log('clean-sass: ', jsOutputPath, '\n', 'Deleted files and folders:\n', paths.join('\n'));
        });
});

gulp.task('build', ['build-ts', 'build-sass']);
gulp.task('rebuild', ['rebuild-ts', 'rebuild-sass']);

var tsPipe = lazypipe()
    .pipe(debug, { title: 'build-ts-in' })
    .pipe(sourceMaps.init)
    .pipe(typescript, 'tsconfig.json')
    .pipe(babel, { presets: "es2015" })
    .pipe(sourceMaps.write)
    .pipe(gulp.dest, jsBuildPath)
    .pipe(debug, { title: 'build-ts-out' });

function buildTS() {
    return gulp.src([srcPath])
        .pipe(newer({ dest: jsBuildPath, ext: '.js' }))
        .pipe(ifNonEmptyAddFiles([typingsPath]))
        .pipe(tsPipe())
        .on('error', onError);;
}

gulp.task('build-ts', buildTS);
gulp.task('rebuild-ts', ['clean-ts'], buildTS);

var sassPipe = lazypipe()
    .pipe(debug, { title: 'build-sass-in' })
    .pipe(sass)
    .pipe(gulp.dest, sassBuildPath)
    .pipe(debug, { title: 'build-sass-out' });

function buildSass() {
    return gulp.src([sassPath])
        .pipe(newer({ dest: sassBuildPath, ext: '.css' }))
        .pipe(sassPipe())
        .on('error', onError);
}

gulp.task('build-sass', buildSass);
gulp.task('rebuild-sass', ['clean-sass'], buildSass);

gulp.task('watch-ts', ['build-ts'], function() {
    return gulp.watch([srcPath, typingsPath], function(event) {
        return gulp.src([event.path, typingsPath])
            .pipe(tsPipe())
            .on('error', onError);
    });
});

gulp.task('watch-sass', ['build-sass'], function() {
    return gulp.watch([sassPath], function(event) {
        gulp.src([event.path])
            .pipe(sassPipe())
            .on('error', onError);
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


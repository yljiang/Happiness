var gulp    = require('gulp'),
    jshint  = require('gulp-jshint');
    sass    = require('gulp-sass');
    nodemon = require('gulp-nodemon');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('develop', function () {
  var stream = nodemon({ script: 'server/app.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , tasks: ['jshint'] })

  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
})

//configure jshint lint
gulp.task('jshint', function() {
    return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//compile sass files
gulp.task('build-css', function() {
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['jshint']);
    gulp.watch('app/scss/**/*.scss', ['build-css']);
});

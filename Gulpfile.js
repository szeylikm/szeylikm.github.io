var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var pump = require('pump');
var plumber = require('gulp-plumber');

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

gulp.task('styles', function() {
  gulp.src('assets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));

});

gulp.task('compress', function (cb) {
  pump ([
    gulp.src(['js/**/scripts.js','node_modules/jquery/dist/jquery.js','node_modules/jquery/jquery.backstretch.min.js']),
    uglify(),
    gulp.dest('scripts/scripts.js')
  ],
cb
);

});

gulp.task('default',function(){
  gulp.watch('assets/**/*.scss',  ['styles']);
  gulp.watch('js/**/scripts.js', ['compress']);
});

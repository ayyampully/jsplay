var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var uglify = require('gulp-uglify');

gulp.task("default", function () {
  return gulp.src('./public/js/src/app.js')
    .pipe(browserify({ transform:'babelify' }))
	//.pipe(uglify())
    .pipe(gulp.dest('./public/js/dist'));
});
var gulp = require("gulp");
var sass = require("gulp-sass");
var purify = require('gulp-purifycss');
let cleanCSS = require('gulp-clean-css');
var checkCSS = require( 'gulp-check-unused-css' );


gulp.task("build", function(){
    gulp.src("./node_modules/bootstrap/scss/bootstrap.scss")
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest("./public/stylesheets"));
});

gulp.task('css', function() {
  return gulp.src(['./public/javascripts/bootstrap.bundle.min.js', './public/stylesheets/bootstrap.css'])
    .pipe(purify(['./views/**/*.hbs']))
    .pipe(gulp.dest('./public/stylesheets'));
});
 
gulp.task('minify-css', () => {
  return gulp.src('./public/stylesheets/bootstrap.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task("watch", function(){
	gulp.watch("./node_modules/bootstrap/scss/**/*.scss", ['build']);
});
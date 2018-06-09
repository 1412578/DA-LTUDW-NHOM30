var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("build", function(){
    gulp.src("./node_modules/bootstrap/scss/bootstrap.scss")
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest("./public/stylesheets"));
});
gulp.task("watch", function(){
	gulp.watch("./node_modules/bootstrap/scss/**/*.scss", ['build']);
});
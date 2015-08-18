var gulp = require("gulp");
var build = require("./tasks/build");
var sass = require("./tasks/sass");
var serve = require("./tasks/serve");
var sprites = require("./tasks/sprites");


gulp.task("sprites", sprites);
gulp.task("sass", ["sprites"], sass);
gulp.task("build", ["sass"], build);
gulp.task("serve", serve);

gulp.task("default", ["sass", "serve"], function () {
	gulp.watch("./source/sprites/buttons/*.png", ["sprites"]);
	gulp.watch("./source/scss/**/*.scss", ["sass"]);
});

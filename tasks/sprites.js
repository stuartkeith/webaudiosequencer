var gulp = require("gulp");
var spritesmith = require("gulp.spritesmith");


module.exports = function () {
	return gulp.src("./source/sprites/*.png")
		.pipe(spritesmith({
			imgName: "./source/css/images/sprites.png",
			cssName: "./source/scss/sprites.scss",
			cssTemplate: "./tasks/sprites.hbs"
		}))
		.pipe(gulp.dest("."));
};

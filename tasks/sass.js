var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");


module.exports = function () {
	return gulp.src("./source/scss/main.scss")
		.pipe(sourcemaps.init())
			.pipe(sass({
				includePaths: ["source/scss/alertify/"],
				outputStyle: "compressed"
			}).on("error", sass.logError))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./source/css/"));
};

var gulp = require("gulp");
var webserver = require("gulp-webserver");

module.exports = function () {
	gulp.src("./source")
		.pipe(webserver());
};

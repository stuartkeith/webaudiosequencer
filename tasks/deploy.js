var gulp = require("gulp");
var rsync = require("gulp-rsync");


module.exports = function () {
	return gulp.src("build/**")
		.pipe(rsync({
			root: "build",
			hostname: "sk",
			destination: "~/webapps/webaudiosequencer",
			incremental: true,
			recursive: true,
			clean: true
		}));
};

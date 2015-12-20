var fs = require("fs-extra");
var gulp = require("gulp");
var requirejs = require("requirejs");


var config = {
	baseUrl: "./source/javascript",
	dir: "./build/javascript",
	mainConfigFile: "./source/javascript/main.js",
	modules: [
		{
			name: "main"
		},
		{
			name: "application",
			exclude: [
				"jquery",
				"text"
			]
		}
	],
	preserveLicenseComments: false,
	removeCombined: true
};

function removeUnusedFiles () {
	fs.removeSync("./build/javascript/build.txt");
	fs.removeSync("./build/javascript/templates");
}

function copyCSS () {
	fs.copySync("./source/css", "./build/css");
}

function copyIndex () {
	var index = fs.readFileSync("./source/index.html", { encoding: "utf8" });
	var googleAnalytics;

	try {
		googleAnalytics = fs.readFileSync("./google-analytics.txt", { encoding: "utf8" });
	} catch (error) {
		googleAnalytics = "";
	}

	index = index.replace("<!-- google analytics -->", googleAnalytics);

	fs.writeFileSync("./build/index.html", index);
}

module.exports = function (callback) {
	requirejs.optimize(config, function (buildResponse) {
		removeUnusedFiles();
		copyCSS();
		copyIndex();

		callback();
	}, function (error) {
		callback(error);
	});
}

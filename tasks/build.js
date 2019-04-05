var fs = require("fs-extra");
var path = require('path');
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
	var googleAnalytics = process.env.WAS_GOOGLE_ANALYTICS;

	if (googleAnalytics) {
		var template = fs.readFileSync(path.join(__dirname, './google-analytics.txt')).toString();

		template = template.replace('{{ code }}', googleAnalytics);

		index = index.replace("<!-- google analytics -->", template);
	}

	fs.writeFileSync("./build/index.html", index);
}

requirejs.optimize(config, function (buildResponse) {
	removeUnusedFiles();
	copyCSS();
	copyIndex();
});

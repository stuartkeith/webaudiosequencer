var fs = require('fs');
var path = require('path');
var Spritesmith = require('spritesmith');


function getSrc() {
	var directory = path.join(__dirname, '../source/sprites');

	var files = fs.readdirSync(directory)
		.filter(filename => path.extname(filename) === '.png')
		.map(filename => path.join(directory, filename));

	return files;
}

function getStylesheet(coordinates) {
	var template = fs.readFileSync(path.join(__dirname, './sprite.hbs')).toString();
	var result = '';

	for (var key in coordinates) {
		var data = coordinates[key];
		data.name = key.match(/([^\/]+)\.png/)[1];

		var templateCopy = template;

		for (var dataKey in data) {
			templateCopy = templateCopy.replace(
				new RegExp('{{ ' + dataKey + ' }}', 'g'),
				data[dataKey]
			);
		}

		result += templateCopy;
	}

	return result;
}

Spritesmith.run({
	src: getSrc(),
	cssName: "../source/scss/sprites.scss"
}, function (error, result) {
	if (error) {
		console.log(error);

		return;
	}

	var stylesheet = getStylesheet(result.coordinates);

	fs.writeFileSync(path.join(__dirname, '../source/css/images/sprites.png'), result.image);
	fs.writeFileSync(path.join(__dirname, '../source/scss/sprites.scss'), stylesheet);
});

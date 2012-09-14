define(function (require) {
	var settings = require("settings");

	var areTracksRemaining = function () {
		return this.trackCollection.length < settings.maxTracks;
	};

	return areTracksRemaining;
});

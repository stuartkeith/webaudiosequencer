define([
	"use!backbone",
	"./track"
], function(Backbone, Track) {
	var Sequencer = function () {
		this.tracks = [];
	};

	_.extend(Sequencer.prototype, Backbone.Events, {
		addTrack: function () {
			var track = new Track();

			this.tracks.push(track);

			this.trigger("trackAdded", track);

			return track;
		}
	});

	return Sequencer;
});

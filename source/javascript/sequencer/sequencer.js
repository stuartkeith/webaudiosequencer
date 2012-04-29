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
		},

		removeTrack: function (track) {
			var index = this.tracks.indexOf(track);

			if (index >= 0) {
				this.tracks.splice(index, 1);

				track.trigger("removed");
				this.trigger("trackRemoved", track);

				return true;
			} else {
				return false;
			}
		}
	});

	return Sequencer;
});

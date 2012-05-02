define(function () {
	var removeTrack = function (track) {
		this.sequencer.removeSequence(track.sequence);

		this.eventBus.trigger("trackRemoved");
	};

	return removeTrack;
});


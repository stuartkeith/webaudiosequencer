define(function () {
	var removeTrack = function (track) {
		this.sequencer.removeSequence(track.sequence);

		track.remove();
	};

	return removeTrack;
});


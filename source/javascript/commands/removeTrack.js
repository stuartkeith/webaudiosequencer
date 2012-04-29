define(function () {
	var removeTrack = function (sequencer) {
		return function (track) {
			sequencer.removeTrack(track);
		};
	};

	return removeTrack;
});


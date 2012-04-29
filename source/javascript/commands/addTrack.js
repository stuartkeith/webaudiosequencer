define(function () {
	var addTrack = function (sequencer) {
		return function () {
			sequencer.addTrack();
		};
	};

	return addTrack;
});


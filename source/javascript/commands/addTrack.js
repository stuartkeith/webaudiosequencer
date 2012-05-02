define(function () {
	var addTrack = function (sequencer) {
		return function (soundAttributes) {
			var track = sequencer.addTrack();
		};
	};

	return addTrack;
});


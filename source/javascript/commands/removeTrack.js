define(function () {
	var removeTrack = function (eventBus, sequencer) {
		return function (track) {
			sequencer.removeSequence(track.sequence);

			eventBus.trigger("trackRemoved");
		};
	};

	return removeTrack;
});


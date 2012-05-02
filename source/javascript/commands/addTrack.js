define(function () {
	var addTrack = function (eventBus, sequencer) {
		return function (soundAttributes) {
			var sequence = sequencer.addSequence(16);

			eventBus.trigger("trackAdded", {
				sequence: sequence
			});
		};
	};

	return addTrack;
});


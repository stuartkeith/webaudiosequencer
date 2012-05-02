define(function () {
	var addTrack = function (soundAttributes) {
		var sequence = this.sequencer.addSequence(16);

		this.eventBus.trigger("trackAdded", {
			sequence: sequence
		});
	};

	return addTrack;
});


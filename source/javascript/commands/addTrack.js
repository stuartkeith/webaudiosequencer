define([
	"instruments/createMelodicInstrumentManager"
], function (createMelodicInstrumentManager) {
	var addTrack = function (soundAttributes) {
		var sequence = this.sequencer.addSequence(16);
		var instrumentManager = createMelodicInstrumentManager();

		sequence.instrumentManager = instrumentManager;
		instrumentManager.soundOutput = this.soundOutput;

		this.eventBus.trigger("trackAdded", {
			instrumentManager: instrumentManager,
			sequence: sequence
		});

		var instrument = instrumentManager.addInstrument();

		this.eventBus.trigger("updateInstrument", instrument, soundAttributes);
	};

	return addTrack;
});


define([
	"instruments/createMelodicInstrumentManager",
	"instruments/createPercussiveInstrumentManager",
	"track/track"
], function (createMelodicInstrumentManager, createPercussiveInstrumentManager, Track) {
	var addTrack = function (instrumentManagerType, soundAttributes) {
		var sequence = this.sequencer.addSequence(16);

		var instrumentManager;

		if (instrumentManagerType === "melodic")
			instrumentManager = createMelodicInstrumentManager();
		else if (instrumentManagerType === "percussive")
			instrumentManager = createPercussiveInstrumentManager();

		sequence.instrumentManager = instrumentManager;
		instrumentManager.soundOutput = this.soundOutput;

		var track = new Track();
		track.instrumentManager = instrumentManager;
		track.sequence = sequence;

		this.eventBus.trigger("trackAdded", track);

		var instrument = instrumentManager.addInstrument();

		this.eventBus.trigger("updateInstrument", instrument, soundAttributes);
	};

	return addTrack;
});


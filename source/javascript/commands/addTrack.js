define([
	"instruments/createMelodicInstrumentManager",
	"track/track"
], function (createMelodicInstrumentManager, Track) {
	var addTrack = function (soundAttributes) {
		var sequence = this.sequencer.addSequence(16);
		var instrumentManager = createMelodicInstrumentManager();

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


define([
	"instruments/createMelodicInstrumentManager",
	"instruments/createPercussiveInstrumentManager",
	"sequencer/sequence",
	"tracks/trackModel"
], function (createMelodicInstrumentManager, createPercussiveInstrumentManager, Sequence, TrackModel) {
	var addTrack = function (instrumentManagerType, soundAttributes) {
		var sequence = new Sequence(this.sequencer.getLength());

		var instrumentManager;

		if (instrumentManagerType === "melodic")
			instrumentManager = createMelodicInstrumentManager();
		else if (instrumentManagerType === "percussive")
			instrumentManager = createPercussiveInstrumentManager();

		sequence.instrumentManager = instrumentManager;

		var trackModel = new TrackModel();
		trackModel.set("instrumentManager", instrumentManager);
		trackModel.set("sequence", sequence);

		this.eventBus.trigger("addTrack", trackModel, soundAttributes);

		this.eventBus.trigger("addInstrument", instrumentManager, soundAttributes);
	};

	return addTrack;
});


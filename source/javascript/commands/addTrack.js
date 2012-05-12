define([
	"instruments/createMelodicInstrumentManager",
	"instruments/createPercussiveInstrumentManager",
	"tracks/trackModel"
], function (createMelodicInstrumentManager, createPercussiveInstrumentManager, TrackModel) {
	var addTrack = function (instrumentManagerType, soundAttributes) {
		var sequence = this.sequencer.addSequence(16);

		var instrumentManager;

		if (instrumentManagerType === "melodic")
			instrumentManager = createMelodicInstrumentManager();
		else if (instrumentManagerType === "percussive")
			instrumentManager = createPercussiveInstrumentManager();

		sequence.instrumentManager = instrumentManager;
		instrumentManager.soundOutput = this.soundOutput;

		var trackModel = new TrackModel();
		trackModel.set("instrumentManager", instrumentManager);
		trackModel.set("sequence", sequence);

		this.trackCollection.add(trackModel);

		this.eventBus.trigger("selectTrack", trackModel);

		this.eventBus.trigger("addInstrument", instrumentManager, soundAttributes);
	};

	return addTrack;
});


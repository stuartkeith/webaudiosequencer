define([
	"instruments/createMelodicInstrumentManager",
	"instruments/createPercussiveInstrumentManager",
	"sequencer/sequence",
	"tracks/trackModel"
], function (createMelodicInstrumentManager, createPercussiveInstrumentManager, Sequence, TrackModel) {
	var addTrack = function (instrumentManagerType, soundAttributes) {
		var sequence = new Sequence(this.sequencer.getLength());

		this.sequencer.addSequence(sequence);

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


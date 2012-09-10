define(function (require) {
	var createMelodicInstrumentManager = require("instruments/createMelodicInstrumentManager"),
	    createPercussiveInstrumentManager = require("instruments/createPercussiveInstrumentManager"),
	    Sequence = require("sequencer/sequence"),
	    Sequencer = require("sequencer/sequencer"),
	    TrackModel = require("tracks/trackModel"),
	    settings = require("settings");

	var createTrack = function (args) {
		if (this.trackCollection.length >= settings.maxTracks)
			return;

		var instrumentManagerType = args.instrumentManagerType;

		var sequence = new Sequence(this.sequenceLength);
		var sequencer = new Sequencer(sequence, this.sequencePosition);

		var instrumentManager;

		if (instrumentManagerType === "melodic")
			instrumentManager = createMelodicInstrumentManager();
		else if (instrumentManagerType === "percussive")
			instrumentManager = createPercussiveInstrumentManager();

		var trackModel = new TrackModel();
		trackModel.set("instrumentManager", instrumentManager);
		trackModel.set("sequence", sequence);
		trackModel.set("sequencer", sequencer);

		args.instrumentManager = instrumentManager;
		args.trackModel = trackModel;

		this.eventBus.trigger("addTrack", args);

		this.eventBus.trigger("addInstrument", args);
	};

	return createTrack;
});

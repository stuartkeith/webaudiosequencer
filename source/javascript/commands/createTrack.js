define(function (require) {
	var createTrack = function (args) {
		var createMelodicInstrumentManager = require("instruments/createMelodicInstrumentManager"),
		    createPercussiveInstrumentManager = require("instruments/createPercussiveInstrumentManager"),
		    Sequence = require("sequencer/sequence"),
		    TrackModel = require("tracks/trackModel"),
		    settings = require("settings");

		if (this.trackCollection.length >= settings.maxTracks)
			return;

		var instrumentManagerType = args.instrumentManagerType;

		var sequence = new Sequence(this.sequencer.getLength());

		var instrumentManager;

		if (instrumentManagerType === "melodic")
			instrumentManager = createMelodicInstrumentManager();
		else if (instrumentManagerType === "percussive")
			instrumentManager = createPercussiveInstrumentManager();

		instrumentManager.addSequence(sequence);

		var trackModel = new TrackModel();
		trackModel.set("instrumentManager", instrumentManager);
		trackModel.set("sequence", sequence);

		args.instrumentManager = instrumentManager;
		args.trackModel = trackModel;

		this.eventBus.trigger("addTrack", args);

		this.eventBus.trigger("addInstrument", args);
	};

	return createTrack;
});


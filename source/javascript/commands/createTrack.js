define(function (require) {
	var MelodicInstrumentManager = require("instruments/melodicInstrumentManager"),
	    PercussiveInstrumentManager = require("instruments/percussiveInstrumentManager"),
	    Sequence = require("sequencer/sequence"),
	    Sequencer = require("sequencer/sequencer"),
	    TrackModel = require("tracks/trackModel");

	var createTrack = function (args) {
		var instrumentManagerType = args.instrumentManagerType;

		var sequence = new Sequence(this.sequenceLength);
		var sequencer = new Sequencer(sequence, this.sequencePosition);

		var instrumentManager;

		if (instrumentManagerType === "melodic")
			instrumentManager = new MelodicInstrumentManager();
		else if (instrumentManagerType === "percussive")
			instrumentManager = new PercussiveInstrumentManager();

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

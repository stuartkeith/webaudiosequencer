define([
], function () {
	var addTrack = function (args) {
		var trackModel = args.trackModel;

		trackModel.get("instrumentManager").soundOutput = this.soundOutput;

		this.trackCollection.add(trackModel);

		this.sequencer.addSequence(trackModel.get("sequence"));

		this.eventBus.trigger("trackAdded", args);
	};

	return addTrack;
});


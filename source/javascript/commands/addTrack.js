define([
], function () {
	var addTrack = function (trackModel, soundAttributes) {
		trackModel.get("instrumentManager").soundOutput = this.soundOutput;

		this.trackCollection.add(trackModel);

		this.sequencer.addSequence(trackModel.get("sequence"));

		this.eventBus.trigger("trackAdded", trackModel);
	};

	return addTrack;
});


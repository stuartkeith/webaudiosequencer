define(function () {
	var removeTrack = function (args) {
		var trackModel = args.trackModel;

		var instrumentManager = trackModel.get("instrumentManager");
		var sequence = trackModel.get("sequence");

		instrumentManager.removeSequence(sequence);

		this.sequencer.removeSequence(sequence);

		var index = this.trackCollection.models.indexOf(trackModel);

		this.trackCollection.remove(trackModel);

		args.index = index;

		this.eventBus.trigger("trackRemoved", args);
	};

	return removeTrack;
});


define(function () {
	var removeTrack = function (args) {
		var trackModel = args.trackModel;

		this.sequencer.removeSequence(trackModel.get("sequence"));

		var index = this.trackCollection.models.indexOf(trackModel);

		this.trackCollection.remove(trackModel);

		args.index = index;

		this.eventBus.trigger("trackRemoved", args);
	};

	return removeTrack;
});


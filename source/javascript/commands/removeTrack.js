define(function () {
	var removeTrack = function (args) {
		var trackModel = args.trackModel;

		this.trackCollection.remove(trackModel);

		args.index = index;

		this.eventBus.trigger("trackRemoved", args);
	};

	return removeTrack;
});

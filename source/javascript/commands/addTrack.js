define(function () {
	var addTrack = function (args) {
		var trackModel = args.trackModel;

		this.trackCollection.add(trackModel);

		this.eventBus.trigger("trackAdded", args);
	};

	return addTrack;
});

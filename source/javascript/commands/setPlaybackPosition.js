define(function () {
	var setPlaybackPosition = function (args) {
		var playbackPosition = args.playbackPosition;

		this.sequencePosition = playbackPosition;

		this.trackCollection.each(function (trackModel) {
			trackModel.get("sequencer").position = playbackPosition;
		});

		this.eventBus.trigger("playbackPositionSet", args);
	};

	return setPlaybackPosition;
});

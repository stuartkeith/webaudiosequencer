define(function () {
	var selectTrack = function (args) {
		var trackModel = args.trackModel;
		var trackIndex = args.trackIndex;

		if (this.selectedTrackModel)
			this.selectedTrackModel.set('selected', false);

		if (trackIndex != null) {
			trackModel = this.trackCollection.at(trackIndex);

			args.trackModel = trackModel;
		}

		if (trackModel) {
			this.selectedTrackModel = trackModel;
			this.selectedTrackModel.set('selected', true);

			this.eventBus.trigger("trackSelected", trackModel);
		}
	};

	return selectTrack;
});


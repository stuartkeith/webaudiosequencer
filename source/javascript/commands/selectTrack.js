define(function () {
	var selectTrack = function (args) {
		var trackModel = args.trackModel,
		    trackIndex = args.trackIndex;

		if (trackIndex != null) {
			trackModel = this.trackCollection.at(trackIndex);

			args.trackModel = trackModel;
		}

		if (trackModel) {
			if (this.selectedTrackModel)
				this.selectedTrackModel.set('selected', false);

			this.selectedTrackModel = trackModel;
			this.selectedTrackModel.set('selected', true);

			this.eventBus.trigger("trackSelected", trackModel);
		}
	};

	return selectTrack;
});


define(function () {
	var selectTrack = function (trackModelOrIndex) {
		var trackModel;
		var trackModelIndex = parseInt(trackModelOrIndex, 10);

		if (trackModelOrIndex === trackModelIndex) {
			trackModel = this.trackCollection.at(trackModelIndex);
		} else {
			trackModel = trackModelOrIndex;
		}

		if (trackModel) {
			this.selectedTrackModel = trackModel;

			this.eventBus.trigger("trackSelected", trackModel);
		}
	};

	return selectTrack;
});


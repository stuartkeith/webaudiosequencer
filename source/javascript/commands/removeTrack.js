define(function () {
	var removeTrack = function (trackModel) {
		this.sequencer.removeSequence(trackModel.get("sequence"));

		var index = this.trackCollection.models.indexOf(trackModel);

		this.trackCollection.remove(trackModel);

		if (this.selectedTrackModel === trackModel && this.trackCollection.length) {
			index = Math.max(0, index - 1);

			this.eventBus.trigger("selectTrack", this.trackCollection.at(index));
		}
	};

	return removeTrack;
});


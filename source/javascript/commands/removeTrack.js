define(function () {
	var removeTrack = function (trackModel) {
		this.sequencer.removeSequence(trackModel.get("sequence"));

		this.trackCollection.remove(trackModel);
	};

	return removeTrack;
});


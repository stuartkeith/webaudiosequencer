define(function () {
	var isSelectedTrack = function (args) {
		return args.trackModel === this.selectedTrackModel;
	};

	return isSelectedTrack;
});

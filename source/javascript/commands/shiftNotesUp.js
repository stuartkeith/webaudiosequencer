define(function () {
	var ShiftNotesUp = function (args) {
		var instrumentManager = args.instrumentManager,
		    instrumentRow = args.instrumentRow,
		    trackModel,
		    sequence;

		var trackModel = this.trackCollection.find(function (trackModel) {
			return trackModel.get("instrumentManager") === instrumentManager;
		});

		if (!trackModel)
			return;

		sequence = trackModel.get("sequence");

		sequence.removeNotesAt({
			top: instrumentRow,
			bottom: instrumentRow
		});

		sequence.shiftNotesAt(0, -1, {
			top: instrumentRow + 1
		});
	};

	return ShiftNotesUp;
});

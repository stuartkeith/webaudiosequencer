define([
	"use!underscore"
], function (_) {
	var ShiftNotesUp = function (args) {
		var instrumentManager = args.instrumentManager;
		var instrumentRow = args.instrumentRow;

		_.each(instrumentManager.sequences, function (sequence) {
			sequence.removeNotesAt({
				top: instrumentRow,
				bottom: instrumentRow
			});

			sequence.shiftNotesAt(0, -1, {
				top: instrumentRow + 1
			});
		});
	};

	return ShiftNotesUp;
});


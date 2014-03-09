define(function () {
	var addNote = function (args) {
		if (!this.selectedTrackModel)
			return;

		var soundOutput = this.soundOutput,
		    delta;

		this.selectedTrackModel.get("sequence").addNoteAt(args);

		// only play sound if it's more than two beats away

		delta = args.x - this.sequencePosition;

		if (!this.scheduler.isPlaying || delta > 1) {
			this.selectedTrackModel.get('instrumentManager').processNote(args.y, function (buffer, note, volume) {
				soundOutput.playBuffer(buffer, note, volume);
			}, this);
		}
	};

	return addNote;
});

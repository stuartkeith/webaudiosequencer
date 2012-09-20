define(function () {
	var playNoteThroughSelectedTrack = function (args) {
		if (!this.selectedTrackModel)
			return;

		var note = args.note,
		    soundOutput = this.soundOutput;

		this.selectedTrackModel.get('instrumentManager').processNote(note, function (buffer, note, volume) {
			soundOutput.playBuffer(buffer, note, volume);
		}, this);
	};

	return playNoteThroughSelectedTrack;
});

define(function () {
	var toggleSequencer = function () {
		if (this.sequencer.isPlaying)
			this.sequencer.stop(true);
		else
			this.sequencer.play(true);
	};

	return toggleSequencer;
});

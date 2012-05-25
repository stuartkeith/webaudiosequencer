define(function () {
	var updateBPM = function (args) {
		this.sequencer.setBPM(args.bpm);
	};

	return updateBPM;
});

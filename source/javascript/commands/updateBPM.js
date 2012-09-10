define(function () {
	var updateBPM = function (args) {
		this.scheduler.setBPM(args.bpm);
	};

	return updateBPM;
});

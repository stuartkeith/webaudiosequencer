define(function (require) {
	var settings = require("settings");

	var updateBPM = function (args) {
		var bpm = parseInt(args.bpm, 10);
		var newBPM;

		if (isNaN(bpm))
			newBPM = settings.bpmDefault;
		else if (bpm < settings.bpmMinimum)
			newBPM = settings.bpmMinimum;
		else if (bpm > settings.bpmMaximum)
			newBPM = settings.bpmMaximum;
		else
			newBPM = bpm;

		this.scheduler.setBPM(newBPM);
	};

	return updateBPM;
});

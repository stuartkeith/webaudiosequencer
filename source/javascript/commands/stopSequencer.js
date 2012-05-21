define([
], function () {
	var stopSequencer = function () {
		this.sequencer.stop(true);
	};

	return stopSequencer;
});

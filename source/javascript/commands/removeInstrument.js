define(function () {
	var removeInstrument = function (args) {
		var instrumentManager = args.instrumentManager;
		var instrument = args.instrument;

		instrumentManager.removeInstrument(instrument);
	};

	return removeInstrument;
});


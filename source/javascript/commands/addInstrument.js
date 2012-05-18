define(function () {
	var addInstrument = function (args) {
		var instrument = args.instrumentManager.addInstrument();

		if (instrument) {
			args.instrument = instrument;

			this.eventBus.trigger("updateInstrument", args);
		}
	};

	return addInstrument;
});


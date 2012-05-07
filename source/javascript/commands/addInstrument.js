define(function () {
	var addInstrument = function (instrumentManager, soundAttributes) {
		var instrument = instrumentManager.addInstrument();

		if (instrument)
			this.eventBus.trigger("updateInstrument", instrument, soundAttributes);
	};

	return addInstrument;
});


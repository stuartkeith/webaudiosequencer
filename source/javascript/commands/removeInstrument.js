define(function () {
	var removeInstrument = function (args) {
		var instrumentManager = args.instrumentManager;
		var instrument = args.instrument;

		var row = instrumentManager.instruments.indexOf(instrument);

		instrumentManager.removeInstrumentAtIndex(row);

		args.instrumentRow = row;

		this.eventBus.trigger("instrumentRemoved", args);
	};

	return removeInstrument;
});


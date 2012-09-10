define(function (require) {
	var _ = require("underscore"),
	    InstrumentManager = require("./instrumentManager"),
	    Instrument = require("./instrument");

	var createPercussiveInstrumentManager = function () {
		var instrumentManager = new InstrumentManager();

		_.extend(instrumentManager, percussiveInstrumentManager);

		return instrumentManager;
	};

	var percussiveInstrumentManager = {
		createInstrument: function () {
			if (this.instruments.length < this.range) {
				var instrument = new Instrument();

				instrument.range = 1;

				return instrument;
			}
		},

		processNote: function (note, fn) {
			var instrument = this.instruments[note];

			if (instrument)
				fn.call(this, instrument.buffer, instrument.transpose, instrument.getVolume());
		}
	};

	return createPercussiveInstrumentManager;
});

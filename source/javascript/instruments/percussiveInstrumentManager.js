define(function (require) {
	var _ = require("underscore"),
	    InstrumentManager = require("./instrumentManager"),
	    Instrument = require("./instrument");

	var PercussiveInstrumentManager = function () {
		InstrumentManager.call(this);
	};

	_.extend(PercussiveInstrumentManager.prototype, InstrumentManager.prototype, {
		createInstrument: function () {
			if (this.instruments.length < this.range) {
				var instrument = new Instrument();

				instrument.range = 1;

				return instrument;
			}
		},

		processNote: function (note, fn) {
			var instrument = this.instruments[note];

			if (instrument && instrument.buffer)
				fn.call(this, instrument.buffer, instrument.transpose, instrument.getVolume());
		}
	});

	return PercussiveInstrumentManager;
});

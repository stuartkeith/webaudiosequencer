define(function (require) {
	var _ = require("underscore"),
	    InstrumentManager = require("./instrumentManager"),
	    Instrument = require("./instrument");

	var MelodicInstrumentManager = function () {
		InstrumentManager.call(this);
	};

	_.extend(MelodicInstrumentManager.prototype, InstrumentManager.prototype, {
		createInstrument: function () {
			if (this.instruments.length === 0) {
				var instrument = new Instrument();

				instrument.range = this.range;
				instrument.transpose = Math.floor(this.range / -2);

				return instrument;
			}
		},

		processNote: function (note, fn) {
			var instrument = this.instruments[0];

			if (instrument && instrument.buffer)
				fn.call(this, instrument.buffer, note + instrument.transpose, instrument.getVolume());
		}
	});

	return MelodicInstrumentManager;
});

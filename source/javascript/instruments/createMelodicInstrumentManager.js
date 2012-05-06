define([
	"use!underscore",
	"./instrumentManager",
	"./instrument"
], function (_, InstrumentManager, Instrument) {
	var createMelodicInstrumentManager = function () {
		var instrumentManager = new InstrumentManager();

		_.extend(instrumentManager, melodicInstrumentManager);

		return instrumentManager;
	};

	var melodicInstrumentManager = {
		createInstrument: function () {
			if (this.instruments.length === 0) {
				var instrument = new Instrument();

				instrument.range = this.range;

				return instrument;
			}
		},

		receiveNotes: function (notes) {
			var instrument = this.instruments[0];

			if (notes && instrument && instrument.buffer) {
				_.each(notes, function (data, note) {
					this.soundOutput.playBuffer(instrument.buffer, parseInt(note));
				}, this);
			}
		}
	};

	return createMelodicInstrumentManager;
});

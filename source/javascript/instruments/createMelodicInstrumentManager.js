define([
	"underscore",
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
				instrument.transpose = Math.floor(this.range / -2);

				return instrument;
			}
		},

		receiveNotes: function (position, notes, delay) {
			var instrument = this.instruments[0];

			if (notes && instrument && instrument.buffer) {
				_.each(notes, function (data, note) {
					this.soundOutput.playBuffer(instrument.buffer, parseInt(note) + instrument.transpose, instrument.getVolume(), delay);
				}, this);
			}
		}
	};

	return createMelodicInstrumentManager;
});

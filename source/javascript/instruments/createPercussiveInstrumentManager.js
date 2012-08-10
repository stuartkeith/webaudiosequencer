define([
	"underscore",
	"./instrumentManager",
	"./instrument"
], function (_, InstrumentManager, Instrument) {
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

		receiveNotes: function (position, notes, delay) {
			var instrument, note;

			_.each(notes, function (data, note) {
				note = parseInt(note);
				instrument = this.instruments[note];

				if (instrument && instrument.buffer)
					this.soundOutput.playBuffer(instrument.buffer, instrument.transpose, instrument.getVolume(), delay);
			}, this);
		}
	};

	return createPercussiveInstrumentManager;
});

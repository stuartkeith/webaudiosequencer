define([
	"use!underscore",
	"use!backbone",
	"settings"
], function (_, Backbone, settings) {
	var InstrumentManager = function () {
		this.instruments = [];
		this.range = settings.maxNotes;
	};

	_.extend(InstrumentManager.prototype, Backbone.Events, {
		addInstrument: function () {
			var instrument = this.createInstrument();

			if (instrument) {
				this.instruments.push(instrument);

				this.trigger("instrumentAdded", instrument);

				return instrument;
			} else {
				return false;
			}
		},

		removeInstrumentAtIndex: function (index) {
			if (index >= 0) {
				var instrument = this.instruments.splice(index, 1)[0];

				instrument.remove();

				this.trigger("instrumentRemoved", instrument);

				return true;
			} else {
				return false;
			}
		},

		removeInstrument: function (instrument) {
			var index = this.instruments.indexOf(instrument);

			return this.removeInstrumentAtIndex(index);
		},

		createInstrument: function () {
			// override this.
		},

		receiveNotes: function (notes) {
			// override this.
		}
	});

	return InstrumentManager;
});

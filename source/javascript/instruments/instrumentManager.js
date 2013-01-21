define(function (require) {
	var _ = require("underscore"),
	    Backbone = require("backbone"),
	    settings = require("settings");

	var InstrumentManager = function () {
		this.instruments = [];
		this.range = settings.maxNotes;
		this.instrumentRange = 0;
		this.instrumentRangeRemaining = this.range;
	};

	_.extend(InstrumentManager.prototype, Backbone.Events, {
		addInstrument: function () {
			var instrument = this.createInstrument();

			if (instrument) {
				this.instruments.push(instrument);

				this.instrumentRange += instrument.range;
				this.instrumentRangeRemaining -= instrument.range;

				this.trigger("instrumentAdded", instrument);

				return instrument;
			} else {
				return false;
			}
		},

		removeInstrumentAtIndex: function (index) {
			if (index >= 0) {
				var instrument = this.instruments.splice(index, 1)[0];

				this.instrumentRange -= instrument.range;
				this.instrumentRangeRemaining += instrument.range;

				instrument.triggerRemove();

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

		processNotes: function (notes, fn) {
			if (notes) {
				_.each(notes, function (data, note) {
					this.processNote(parseInt(note, 10), fn);
				}, this);
			}
		},

		createInstrument: function () {
			// override this.
		},

		processNote: function (note, fn) {
			// override this.
		}
	});

	return InstrumentManager;
});

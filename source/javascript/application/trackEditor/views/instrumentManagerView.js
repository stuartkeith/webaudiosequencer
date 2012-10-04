define(function(require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    InstrumentView = require("./instrumentView");

	var InstrumentManagerView = BaseView.extend({
		modelEvents: {
			"instrumentAdded": "addInstrumentView"
		},

		render: function () {
			this.removeAllChildViews();

			_.each(this.model.instruments, function (instrument) {
				this.addInstrumentView(instrument);
			}, this);

			return this;
		},

		addInstrumentView: function (instrument) {
			var instrumentView = this.addChildView(InstrumentView, {
				model: instrument
			});

			instrumentView.on("removeInstrument", this.removeInstrument, this);

			// add the element before rendering so styles will be accessible.
			this.$el.append(instrumentView.$el);

			instrumentView.render();
		},

		removeInstrument: function (instrument) {
			this.eventBus.trigger("removeInstrument", {
				instrument: instrument,
				instrumentManager: this.model
			});
		}
	});

	return InstrumentManagerView;
});

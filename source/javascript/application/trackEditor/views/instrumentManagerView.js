define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"settings",
	"./instrumentView",
], function(_, Backbone, BaseView, settings, InstrumentView) {
	var InstrumentManagerView = BaseView.extend({
		modelEvents: {
			"instrumentAdded": function (instrument) {
				this.addInstrumentView(instrument);
			}
		},

		render: function () {
			this.removeAllChildViews();

			_.each(this.model.instruments, function (instrument) {
				this.addInstrumentView(instrument, true);
			}, this);

			this.trigger("resize");

			return this;
		},

		addInstrumentView: function (instrument, preventResizeEvent) {
			var instrumentView = this.addChildView(InstrumentView, {
				model: instrument
			});

			instrumentView.on("removeInstrument", this.removeInstrument, this);

			instrumentView.render();

			this.$el.append(instrumentView.$el);

			if (!preventResizeEvent)
				this.trigger("resize");
		},

		removeInstrument: function (instrument) {
			this.eventBus.trigger("removeInstrument", this.model, instrument);
		},
	});

	return InstrumentManagerView;
});

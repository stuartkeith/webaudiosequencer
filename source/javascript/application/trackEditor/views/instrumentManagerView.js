define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"settings",
	"./instrumentView",
	"./newInstrumentAreaView"
], function(_, Backbone, BaseView, settings, InstrumentView, NewInstrumentAreaView) {
	var InstrumentManagerView = BaseView.extend({
		modelEvents: {
			"instrumentAdded": function (instrument) {
				var instrumentView = this.addChildView(InstrumentView, { model: instrument });

				instrumentView.render();

				this.instrumentContainer.append(instrumentView.$el);

				var remainingHeight = this.$el.outerHeight(true) - this.instrumentContainer.outerHeight(true);

				this.newInstrumentArea.height(remainingHeight);
			}
		},

		render: function () {
			this.newInstrumentArea = this.$el.find(".new-instrument-area:first");

			this.addChildView(NewInstrumentAreaView, {
				el: this.newInstrumentArea,
				model: this.model
			});

			this.instrumentContainer = this.$el.find(".instrument-container:first");

			this.$el.height(this.model.range * settings.instrumentHeight);
		}
	});

	return InstrumentManagerView;
});

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

				instrumentView.on("removeInstrument", this.removeInstrument, this);

				instrumentView.render();

				this.instrumentContainer.append(instrumentView.$el);

				this.resizeNewInstrumentArea();
			},

			"instrumentRemoved": function (instrument) {
				this.resizeNewInstrumentArea();
			}
		},

		render: function () {
			this.newInstrumentArea = this.$el.find(".new-instrument-area:first");

			this.newInstrumentAreaView = this.addChildView(NewInstrumentAreaView, {
				el: this.newInstrumentArea,
				model: this.model
			});

			this.instrumentContainer = this.$el.find(".instrument-container:first");

			this.$el.height(this.model.range * settings.instrumentHeight);

			this.resizeNewInstrumentArea();
		},

		removeInstrument: function (instrument) {
			this.eventBus.trigger("removeInstrument", this.model, instrument);
		},

		resizeNewInstrumentArea: function () {
			var remainingHeight = this.$el.outerHeight(true) - this.instrumentContainer.outerHeight(true);

			this.newInstrumentArea.height(remainingHeight);
		}
	});

	return InstrumentManagerView;
});

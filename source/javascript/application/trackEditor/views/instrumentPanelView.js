define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"settings",
	"./instrumentManagerView",
	"./newInstrumentAreaView"
], function(_, Backbone, BaseView, settings, InstrumentManagerView, NewInstrumentAreaView) {
	var InstrumentPanelView = BaseView.extend({
		initialize: function () {
			this.$el.height(settings.maxNotes * settings.instrumentHeight);

			this.instrumentManagerView = this.addChildView(InstrumentManagerView, {
				el: this.$el.find(".instrument-manager:first")
			});

			this.instrumentManagerView.on("resize", this.resizeNewInstrumentArea, this);

			this.newInstrumentAreaView = this.addChildView(NewInstrumentAreaView, {
				el: this.$el.find(".new-instrument-area:first")
			});
		},

		setInstrumentManager: function (instrumentManager) {
			this.instrumentManagerView.setModel(instrumentManager);
			this.newInstrumentAreaView.setModel(instrumentManager);
		},

		render: function () {
			this.instrumentManagerView.render();

			return this;
		},

		resizeNewInstrumentArea: function () {
			var remainingHeight = this.$el.outerHeight(true) - this.instrumentManagerView.$el.outerHeight(true);

			this.newInstrumentAreaView.$el.height(remainingHeight);
		}
	});

	return InstrumentPanelView;
});

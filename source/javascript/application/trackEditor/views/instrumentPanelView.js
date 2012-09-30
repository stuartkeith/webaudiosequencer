define([
	"underscore",
	"backbone",
	"baseView",
	"./instrumentManagerView",
	"./newInstrumentAreaView"
], function(_, Backbone, BaseView, InstrumentManagerView, NewInstrumentAreaView) {
	var InstrumentPanelView = BaseView.extend({
		initialize: function () {
			this.instrumentManagerView = this.addChildView(InstrumentManagerView, {
				el: this.$el.find(".instrument-manager:first")
			});

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
			this.newInstrumentAreaView.render();

			return this;
		}
	});

	return InstrumentPanelView;
});

define(function (require) {
	var BaseView = require("baseView"),
	    InstrumentManagerView = require("./instrumentManagerView"),
	    NewInstrumentAreaView = require("./newInstrumentAreaView");

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

define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./instrumentView"
], function(_, Backbone, BaseView, InstrumentView) {
	var InstrumentManagerView = BaseView.extend({
		initialize: function () {
		},

		modelEvents: {
			"instrumentAdded": function (instrument) {
				var instrumentView = this.addChildView(InstrumentView, { model: instrument });

				instrumentView.render();

				this.$el.append(instrumentView.$el);
			}
		},

		events: {
		},

		render: function () {
			return this;
		}
	});

	return InstrumentManagerView;
});

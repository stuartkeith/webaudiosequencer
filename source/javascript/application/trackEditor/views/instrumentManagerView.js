define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"settings",
	"./instrumentView"
], function(_, Backbone, BaseView, settings, InstrumentView) {
	var InstrumentManagerView = BaseView.extend({
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
			this.$el.height(this.model.range * settings.instrumentHeight);

			return this;
		}
	});

	return InstrumentManagerView;
});

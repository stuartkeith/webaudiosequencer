define([
	"underscore",
	"backbone",
	"baseView",
	"dragDropMixIn",
	"settings"
], function(_, Backbone, BaseView, dragDropMixIn, settings) {
	var NewInstrumentAreaView = BaseView.extend({
		dragTarget: "SoundExtended",
		dropEffect: "copy",

		initialize: function () {
			this.heightDifference = this.$el.outerHeight(true) - this.$el.height();
		},

		events: {
			"dragenter": function (model, event) {
				this.$el.addClass("drag-over");
			},

			"dragleave": function (model, event) {
				this.$el.removeClass("drag-over");
			},

			"drop": function (model, event) {
				this.$el.removeClass("drag-over");

				this.eventBus.trigger("addInstrument", {
					instrumentManager: this.model,
					soundAttributes: model
				});
			}
		},

		eventBusEvents: {
			"overSoundExtended": function () {
				this.$el.addClass("drag-available");
			},

			"outSoundExtended": function () {
				this.$el.removeClass("drag-available");
			}
		},

		modelEvents: {
			"instrumentAdded": "render",
			"instrumentRemoved": "render"
		},

		render: function () {
			if (this.model.instrumentRangeRemaining === 0) {
				this.$el.hide();
			} else {
				this.$el.show();
				this.$el.height((this.model.instrumentRangeRemaining * settings.instrumentHeight) - this.heightDifference);
			}
		}
	});

	_.extend(NewInstrumentAreaView.prototype, dragDropMixIn(BaseView));

	return NewInstrumentAreaView;
});

define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"dragDropMixIn",
], function(_, Backbone, BaseView, dragDropMixIn) {
	var NewInstrumentAreaView = BaseView.extend({
		dragTarget: "SoundExtended",
		dropEffect: "copy",

		events: {
			"dragenter": function (model, event) {
				this.$el.addClass("drag-over");
			},

			"dragleave": function (model, event) {
				this.$el.removeClass("drag-over");
			},

			"drop": function (model, event) {
				this.$el.removeClass("drag-over");

				this.eventBus.trigger("addInstrument", this.model, model);
			}
		},

		eventBusEvents: {
			"overSoundExtended": function () {
				this.$el.addClass("drag-available");
			},

			"outSoundExtended": function () {
				this.$el.removeClass("drag-available");
			}
		}
	});

	_.extend(NewInstrumentAreaView.prototype, dragDropMixIn(BaseView));

	return NewInstrumentAreaView;
});

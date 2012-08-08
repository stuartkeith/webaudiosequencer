define([
	"jquery",
	"underscore",
	"backbone",
	"baseView",
	"dragDropMixIn",
], function($, _, Backbone, BaseView, dragDropMixIn) {
	var DraggableView = BaseView.extend({
		dragSource: "SoundExtended",
		dragEffect: "copy",

		initialize: function () {
			this.$el.attr("draggable", true);
		},

		events: {
			"mouseenter": function (event) {
				this.eventBus.trigger("overSoundExtended");
			},

			"mouseleave": function (event) {
				this.eventBus.trigger("outSoundExtended");
			},

			"dragstart": function (event) {
				this.$el.addClass("dragstart");
			},

			"dragend": function (event) {
				this.$el.removeClass("dragstart");
			}
		}
	});

	_.extend(DraggableView.prototype, dragDropMixIn(BaseView));

	return DraggableView;
});

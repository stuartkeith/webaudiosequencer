define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"dragDropMixIn",
	"text!templates/trackEditor/trackEditor.html",
	"./views/gridView"
], function(_, Backbone, BaseView, dragDropMixIn, TrackEditorTemplateString, GridView) {
	var TrackEditorView = BaseView.extend({
		className: "track-editor",
		trackEditorTemplate: _.template(TrackEditorTemplateString),

		dragTarget: "SoundExtended",
		dropEffect: "copy",

		events: {
			"click .remove-track": function (event) {
				this.eventBus.trigger("removeTrack", this.model);
			},

			"dragenter": function (model, event) {
				this.$el.addClass("drag-over");
			},

			"dragleave": function (model, event) {
				this.$el.removeClass("drag-over");
			},

			"drop": function (model, event) {
				this.$el.removeClass("drag-over");
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
			"remove": function () {
				this.remove();
			}
		},

		render: function () {
			this.$el.html(this.trackEditorTemplate());

			var gridCanvas = this.$el.find(".grid-canvas:first");
			var gridView = this.addChildView(GridView, { el: gridCanvas, model: this.model.sequence });
			gridView.render();

			return this;
		}
	});

	_.extend(TrackEditorView.prototype, dragDropMixIn(BaseView));

	return TrackEditorView;
});

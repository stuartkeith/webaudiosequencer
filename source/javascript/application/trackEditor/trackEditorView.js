define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/trackEditor/trackEditor.html",
	"./views/gridView"
], function(_, Backbone, BaseView, TrackEditorTemplateString, GridView) {
	var TrackEditorView = BaseView.extend({
		className: "track-editor",
		trackEditorTemplate: _.template(TrackEditorTemplateString),

		events: {
			"click .remove-track": function (event) {
				this.eventBus.trigger("removeTrack", this.model);
			}
		},

		modelEvents: {
			"removed": function () {
				this.remove();
			}
		},

		render: function () {
			this.$el.html(this.trackEditorTemplate());

			var gridCanvas = this.$el.find(".grid-canvas:first");
			var gridView = this.addChildView(GridView, { el: gridCanvas, model: this.model });
			gridView.render();

			return this;
		}
	});

	return TrackEditorView;
});

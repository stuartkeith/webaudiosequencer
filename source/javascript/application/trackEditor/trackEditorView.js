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

		render: function () {
			this.$el.html(this.trackEditorTemplate());

			var gridCanvas = this.$el.find(".grid-canvas:first");
			var gridView = this.addChildView(GridView, { el: gridCanvas });
			gridView.render();

			return this;
		}
	});

	return TrackEditorView;
});

define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/loopEditor/loopEditor.html",
	"./views/gridView"
], function(_, Backbone, BaseView, LoopEditorTemplateString, GridView) {
	var LoopEditorView = BaseView.extend({
		className: "loop-editor",
		loopEditorTemplate: _.template(LoopEditorTemplateString),

		render: function () {
			this.$el.html(this.loopEditorTemplate());

			var gridCanvas = this.$el.find(".grid-canvas:first");
			var gridView = this.addChildView(GridView, { el: gridCanvas });
			gridView.render();

			return this;
		}
	});

	return LoopEditorView;
});

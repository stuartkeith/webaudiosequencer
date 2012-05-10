define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/trackEditor/trackEditor.html",
	"./views/gridView",
	"./views/instrumentManagerView"
], function(_, Backbone, BaseView, TrackEditorTemplateString, GridView, InstrumentManagerView) {
	var TrackEditorView = BaseView.extend({
		className: "track-editor",
		trackEditorTemplate: _.template(TrackEditorTemplateString),

		events: {
			"click .close": function (event) {
				this.eventBus.trigger("removeTrack", this.model);
			}
		},

		modelEvents: {
			"remove": function () {
				this.remove();
			}
		},

		render: function () {
			this.$el.html(this.trackEditorTemplate());

			this.addChildView(InstrumentManagerView, {
				el: this.$el.find(".instrument-manager:first"),
				model: this.model.get("instrumentManager")
			}).render();

			var gridView = this.addChildView(GridView, {
				el: this.$el.find(".grid-canvas:first"),
				model: this.model.get("sequence")
			}).render();

			return this;
		}
	});

	return TrackEditorView;
});

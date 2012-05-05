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
			"click .remove-track": function (event) {
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

			var instrumentManager = this.$el.find(".instrument-manager");
			this.addChildView(InstrumentManagerView, { el: instrumentManager, model: this.model.instrumentManager }).render();

			var gridCanvas = this.$el.find(".grid-canvas:first");
			var gridView = this.addChildView(GridView, { el: gridCanvas, model: this.model.sequence });
			gridView.render();

			return this;
		}
	});

	return TrackEditorView;
});

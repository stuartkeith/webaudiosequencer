define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/trackEditor/trackEditor.html",
	"./views/gridView",
	"./views/instrumentPanelView"
], function(_, Backbone, BaseView, TrackEditorTemplateString, GridView, InstrumentPanelView) {
	var TrackEditorView = BaseView.extend({
		className: "track-editor",
		trackEditorTemplate: _.template(TrackEditorTemplateString),

		eventBusEvents: {
			"trackSelected": function (trackModel) {
				this.gridView.setModel(trackModel.get("sequence"));
				this.gridView.render();

				this.instrumentPanelView.setInstrumentManager(trackModel.get("instrumentManager"));
				this.instrumentPanelView.render();
			}
		},

		render: function () {
			this.$el.html(this.trackEditorTemplate());

			this.instrumentPanelView = this.addChildView(InstrumentPanelView, {
				el: this.$el.find(".instrument-panel:first"),
			});

			this.gridView = this.addChildView(GridView, {
				el: this.$el.find(".grid-canvas:first"),
			});

			return this;
		}
	});

	return TrackEditorView;
});

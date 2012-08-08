define([
	"underscore",
	"backbone",
	"baseView",
	"text!templates/trackEditor/trackEditor.html",
	"./views/sequenceProgressView",
	"./views/gridView",
	"./views/instrumentPanelView"
], function(_, Backbone, BaseView, TrackEditorTemplateString, SequenceProgressView, GridView, InstrumentPanelView) {
	var TrackEditorView = BaseView.extend({
		className: "track-editor",
		trackEditorTemplate: _.template(TrackEditorTemplateString),

		eventBusEvents: {
			"trackSelected": "updateTrackModel"
		},

		render: function () {
			this.$el.html(this.trackEditorTemplate());

			this.sequenceProgressView = this.addChildView(SequenceProgressView, {
				el: this.$el.find(".sequence-progress:first")
			});

			this.instrumentPanelView = this.addChildView(InstrumentPanelView, {
				el: this.$el.find(".instrument-panel:first")
			});

			this.gridView = this.addChildView(GridView, {
				el: this.$el.find(".grid-canvas:first")
			});

			if (this.model)
				this.updateTrackModel(this.model);

			return this;
		},

		updateTrackModel: function (trackModel) {
			this.setModel(trackModel);

			this.sequenceProgressView.setModel(trackModel.get("sequence"));
			this.sequenceProgressView.render();

			this.gridView.setModel(trackModel.get("sequence"));
			this.gridView.render();

			this.instrumentPanelView.setInstrumentManager(trackModel.get("instrumentManager"));
			this.instrumentPanelView.render();
		}
	});

	return TrackEditorView;
});

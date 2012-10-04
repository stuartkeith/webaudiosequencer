define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    TrackEditorTemplateString = require("text!templates/trackEditor/trackEditor.html"),
	    SequenceProgressView = require("./views/sequenceProgressView"),
	    GridView = require("./views/gridView"),
	    InstrumentPanelView = require("./views/instrumentPanelView");

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

			this.sequenceProgressView.setModel(trackModel.get("sequencer"));
			this.sequenceProgressView.render();

			this.gridView.setModel(trackModel.get("sequence"));
			this.gridView.render();

			this.instrumentPanelView.setInstrumentManager(trackModel.get("instrumentManager"));
			this.instrumentPanelView.render();
		}
	});

	return TrackEditorView;
});

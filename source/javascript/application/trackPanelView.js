define([
	"underscore",
	"backbone",
	"baseView",
	"./sequencerControls/sequencerControlsView",
	"./trackControls/trackControlsView",
	"./trackEditor/trackEditorView",
	"text!templates/trackPanel.html"
], function(_, Backbone, BaseView, SequencerControlsView, TrackControlsView, TrackEditorView, trackPanelTemplateString) {
	var TrackPanelView = BaseView.extend({
		className: "track-panel-view",
		trackPanelTemplate: _.template(trackPanelTemplateString),

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.trackPanelTemplate());

			this.addChildView(SequencerControlsView, {
				el: this.$el.find(".sequencer-controls"),
				model: this.model.sequencer
			}).render();

			this.addChildView(TrackControlsView, {
				el: this.$el.find(".track-controls"),
				model: this.model.trackCollection
			}).render();

			this.addChildView(TrackEditorView, {
				el: this.$el.find(".track-editor"),
				model: this.model.trackCollection.models[0]
			}).render();

			return this;
		}
	});

	return TrackPanelView;
});

define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    PlaybackControlsView = require("./playbackControls/playbackControlsView"),
	    TrackControlsView = require("./trackControls/trackControlsView"),
	    TrackEditorView = require("./trackEditor/trackEditorView"),
	    trackPanelTemplateString = require("text!templates/trackPanel.html");

	var TrackPanelView = BaseView.extend({
		className: "track-panel-view",
		trackPanelTemplate: _.template(trackPanelTemplateString),

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.trackPanelTemplate());

			this.addChildView(PlaybackControlsView, {
				el: this.$(".playback-controls"),
				model: this.model.scheduler
			}).render();

			this.addChildView(TrackControlsView, {
				el: this.$(".track-controls"),
				model: this.model.trackCollection
			}).render();

			this.addChildView(TrackEditorView, {
				el: this.$(".track-editor"),
				model: this.model.trackCollection.models[0]
			}).render();

			return this;
		}
	});

	return TrackPanelView;
});

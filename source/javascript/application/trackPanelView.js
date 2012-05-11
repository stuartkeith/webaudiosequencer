define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./trackControls/trackControlsView",
	"./trackEditor/trackEditorView",
	"text!templates/trackPanel.html"
], function(_, Backbone, BaseView, TrackControlsView, TrackEditorView, trackPanelTemplateString) {
	var TrackPanelView = BaseView.extend({
		className: "track-panel-view",
		trackPanelTemplate: _.template(trackPanelTemplateString),

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.trackPanelTemplate());

			this.addChildView(TrackControlsView, {
				el: this.$el.find(".track-controls"),
				model: this.model
			}).render();

			this.addChildView(TrackEditorView, {
				el: this.$el.find(".track-editor"),
				model: this.model.models[0]
			}).render();

			return this;
		}
	});

	return TrackPanelView;
});

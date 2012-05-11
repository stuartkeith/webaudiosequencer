define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./soundBrowser/soundBrowserView",
	"./trackPanelView",
	"text!templates/application.html"
], function(_, Backbone, BaseView, SoundBrowserView, TrackPanelView, applicationTemplateString) {
	var ApplicationView = BaseView.extend({
		applicationTemplate: _.template(applicationTemplateString),

		modelEvents: {
			"add": function (trackModel, trackCollection) {
				if (trackCollection.length === 1) {
					this.trackPanelView = this.addChildView(TrackPanelView, {
						model: trackCollection
					}).render();

					this.trackPanelContainer.append(this.trackPanelView.$el);
				}
			},

			"remove": function (trackModel, trackCollection) {
				if (trackCollection.length === 0) {
					this.removeChildView(this.trackPanelView);

					this.trackPanelView = null;
				}
			}
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.applicationTemplate());

			var soundBrowserView = this.addChildView(SoundBrowserView, {
				el: this.$el.find(".sound-browser:first")
			}).render();

			this.trackPanelContainer = this.$el.find(".track-panel-container:first");

			return this;
		}
	});

	return ApplicationView;
});

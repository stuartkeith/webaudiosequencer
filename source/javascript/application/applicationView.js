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

		eventBusEvents: {
			"trackAdded": function () {
				if (this.model.trackCollection.length === 1) {
					this.trackPanelView = this.addChildView(TrackPanelView, {
						model: this.model
					}).render();

					this.trackPanelContainer.append(this.trackPanelView.$el);
				}
			},

			"trackRemoved": function () {
				if (this.model.trackCollection.length === 0) {
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

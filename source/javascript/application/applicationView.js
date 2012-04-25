define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./soundBrowser/soundBrowserView",
	"text!templates/application.html"
], function(_, Backbone, BaseView, SoundBrowserView, applicationTemplateString) {
	var ApplicationView = BaseView.extend({
		applicationTemplate: _.template(applicationTemplateString),

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.applicationTemplate());

			var soundBrowser = this.$el.find(".sound-browser:first");

			var soundBrowserView = this.addChildView(SoundBrowserView, { el: soundBrowser });
			soundBrowserView.render();

			return this;
		}
	});

	return ApplicationView;
});

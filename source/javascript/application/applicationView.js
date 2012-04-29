define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./soundBrowser/soundBrowserView",
	"./loopEditor/loopEditorView",
	"text!templates/application.html"
], function(_, Backbone, BaseView, SoundBrowserView, LoopEditorView, applicationTemplateString) {
	var ApplicationView = BaseView.extend({
		applicationTemplate: _.template(applicationTemplateString),

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.applicationTemplate());

			var soundBrowser = this.$el.find(".sound-browser:first");

			var soundBrowserView = this.addChildView(SoundBrowserView, { el: soundBrowser });
			soundBrowserView.render();

			var loopEditor = this.$el.find(".loop-editor:first");

			var loopEditorView = this.addChildView(LoopEditorView, { el: loopEditor });
			loopEditorView.render();

			return this;
		}
	});

	return ApplicationView;
});

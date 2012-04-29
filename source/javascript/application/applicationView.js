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

		modelEvents: {
			"trackAdded": function (track) {
				var loopEditorView = this.addChildView(LoopEditorView, { model: track });

				this.loopEditorContainer.append(loopEditorView.render().$el);
			}
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.applicationTemplate());

			var soundBrowser = this.$el.find(".sound-browser:first");

			var soundBrowserView = this.addChildView(SoundBrowserView, { el: soundBrowser });
			soundBrowserView.render();

			this.loopEditorContainer = this.$el.find(".loop-editor-container:first");

			return this;
		}
	});

	return ApplicationView;
});

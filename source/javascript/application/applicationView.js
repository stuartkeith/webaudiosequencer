define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./soundBrowser/soundBrowserView",
	"./trackEditor/trackEditorView",
	"text!templates/application.html"
], function(_, Backbone, BaseView, SoundBrowserView, TrackEditorView, applicationTemplateString) {
	var ApplicationView = BaseView.extend({
		applicationTemplate: _.template(applicationTemplateString),

		eventBusEvents: {
			"trackAdded": function (trackModel) {
				var trackEditorView = this.addChildView(TrackEditorView, { model: trackModel });

				this.trackEditorContainer.append(trackEditorView.render().$el);
			}
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.applicationTemplate());

			var soundBrowser = this.$el.find(".sound-browser:first");

			var soundBrowserView = this.addChildView(SoundBrowserView, { el: soundBrowser });
			soundBrowserView.render();

			this.trackEditorContainer = this.$el.find(".track-editor-container:first");

			return this;
		}
	});

	return ApplicationView;
});

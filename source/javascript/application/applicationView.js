define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./instructionsPanel/instructionsPanelView",
	"./soundBrowser/soundBrowserView",
	"./trackPanelView",
	"text!templates/application.html"
], function(_, Backbone, BaseView, InstructionsPanelView, SoundBrowserView, TrackPanelView, applicationTemplateString) {
	var ApplicationView = BaseView.extend({
		applicationTemplate: _.template(applicationTemplateString),

		eventBusEvents: {
			"trackAdded": function () {
				if (this.model.trackCollection.length === 1) {
					this.removeInstructionsPanel();

					this.addTrackPanelView();
				}
			},

			"trackRemoved": function () {
				if (this.model.trackCollection.length === 0) {
					this.removeTrackPanelView();

					this.addInstructionsPanel();
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

			this.addInstructionsPanel();

			return this;
		},

		addInstructionsPanel: function () {
			if (!this.instructionsPanelView) {
				this.instructionsPanelView = this.addChildView(InstructionsPanelView).render();

				this.trackPanelContainer.append(this.instructionsPanelView.$el);
			}
		},

		removeInstructionsPanel: function () {
			if (this.instructionsPanelView) {
				this.removeChildView(this.instructionsPanelView);
				this.instructionsPanelView = null;
			}
		},

		addTrackPanelView: function () {
			if (!this.trackPanelView) {
				this.trackPanelView = this.addChildView(TrackPanelView, {
					model: this.model
				}).render();

				this.trackPanelContainer.append(this.trackPanelView.$el);
			}
		},

		removeTrackPanelView: function () {
			if (this.trackPanelView) {
				this.removeChildView(this.trackPanelView);

				this.trackPanelView = null;
			}
		}
	});

	return ApplicationView;
});

define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    InstructionsPanelView = require("./instructionsPanel/instructionsPanelView"),
	    SoundBrowserView = require("./soundBrowser/soundBrowserView"),
	    TrackPanelView = require("./trackPanelView"),
	    SoundPopUpView = require("./soundPopUpView"),
	    applicationTemplateString = require("text!templates/application.html");

	var ApplicationView = BaseView.extend({
		applicationTemplate: _.template(applicationTemplateString),
		subView: null,

		eventBusEvents: {
			"trackAdded": function () {
				if (this.model.trackCollection.length === 1) {
					this.setSubView(this.trackPanelView);
				}
			},

			"trackRemoved": function () {
				if (this.model.trackCollection.length === 0) {
					this.setSubView(this.instructionsPanelView);
				}
			}
		},

		setSubView: function (subView) {
			if (subView === this.subView)
				return;

			this.trackPanelContainer.fadeOut(300, function () {
				if (this.subView)
					this.subView.$el.detach();

				this.subView = subView;

				this.trackPanelContainer.append(this.subView.$el);

				this.subView.render();

				this.trackPanelContainer.hide().fadeIn(300);
			}.bind(this));
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.applicationTemplate());

			var soundBrowserView = this.addChildView(SoundBrowserView, {
				el: this.$el.find(".sound-browser:first"),
				model: this.model
			}).render();

			this.instructionsPanelView = this.addChildView(InstructionsPanelView);

			this.trackPanelView = this.addChildView(TrackPanelView, {
				model: this.model
			});

			this.trackPanelContainer = this.$el.find(".track-panel-container:first");

			this.addChildView(SoundPopUpView, {
				el: this.$el
			}).render();

			this.setSubView(this.instructionsPanelView);

			return this;
		}
	});

	return ApplicationView;
});

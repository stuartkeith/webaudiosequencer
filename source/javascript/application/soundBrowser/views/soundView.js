define([
	"jquery",
	"underscore",
	"backbone",
	"baseView",
	"application/soundPlayView",
	"./draggableView",
	"text!templates/soundBrowser/sound.html"
], function($, _, Backbone, BaseView, SoundPlayView, DraggableView, soundTemplateString) {
	var SoundView = BaseView.extend({
		className: "sound",
		tagName: "td",

		mouseDownTime: 500,

		soundTemplate: _.template(soundTemplateString),

		events: {
			"mousedown .add": function (event) {
				this.timeout = setTimeout(_.bind(function () {
					this.ignoreClick = true;

					this.triggerCreateTrack("melodic");
				}, this), this.mouseDownTime);
			},

			"mouseleave .add": function (event) {
				this.ignoreClick = false;

				this.stopTimeout();
			},

			"click .add": function (event) {
				this.stopTimeout();

				if (this.ignoreClick)
					this.ignoreClick = false;
				else
					this.triggerCreateTrack("percussive");
			}
		},

		triggerCreateTrack: function (instrumentManagerType) {
			this.eventBus.trigger("createTrack", {
				instrumentManagerType: instrumentManagerType,
				soundAttributes: this.model.attributes
			});
		},

		stopTimeout: function () {
			if (this.timeout) {
				clearTimeout(this.timeout);

				delete this.timeout;
			}
		},

		render: function () {
			if (this.model) {
				this.$el.html(this.soundTemplate(this.model.toJSON()));

				this.$el.find(".add:first").button({
					icons: {
						primary: "sprite-buttons-add"
					},

					text: false
				});

				var soundPlay = this.$el.find(".sound-play:first");
				var draggable = this.$el.find(".draggable:first");

				this.addChildView(SoundPlayView, {
					el: soundPlay,
					model: this.model
				});

				this.addChildView(DraggableView, {
					el: draggable,
					model: this.model.attributes
				});
			}

			return this;
		}
	});

	return SoundView;
});

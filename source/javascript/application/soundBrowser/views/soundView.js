define([
	"jquery",
	"use!underscore",
	"use!backbone",
	"baseView",
	"./draggableView",
	"text!templates/soundBrowser/sound.html"
], function($, _, Backbone, BaseView, DraggableView, soundTemplateString) {
	var SoundView = BaseView.extend({
		className: "sound",

		soundTemplate: _.template(soundTemplateString),

		events: {
			"click .play": function (event) {
				if (this.playIsDisabled)
					return;

				this.playIsDisabled = true;

				event.preventDefault();

				var that = this;
				var buttonElement = $(event.target);
				var deferred = new $.Deferred();

				buttonElement.removeClass("error");

				deferred.progress(function (type) {
					if (type === "loading") {
						buttonElement.addClass("loading");
					} else if (type === "playing") {
						buttonElement.removeClass("loading");
						buttonElement.addClass("playing");
					}
				});

				deferred.always(function () {
					buttonElement.removeClass("loading playing");

					that.playIsDisabled = false;
				});

				deferred.fail(function () {
					buttonElement.addClass("error");
				});

				this.eventBus.trigger("playSoundAttributes", this.model.attributes, deferred);

				return false;
			},

			"click .add": function (event) {
				this.eventBus.trigger("addTrack", "percussive", this.model.attributes);
			}
		},

		render: function () {
			if (this.model) {
				this.$el.html(this.soundTemplate(this.model.toJSON()));

				var draggable = this.$el.find(".draggable:first");

				this.addChildView(DraggableView, { el: draggable, model: this.model.attributes });
			}

			return this;
		}
	});

	return SoundView;
});

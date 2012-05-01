define([
	"jquery",
	"use!underscore",
	"use!backbone",
	"baseView",
	"dragDropMixIn",
	"text!templates/soundBrowser/sound.html"
], function($, _, Backbone, BaseView, dragDropMixIn, soundTemplateString) {
	var SoundView = BaseView.extend({
		className: "sound",
		dragSource: "SoundExtended",
		dragEffect: "copy",

		soundTemplate: _.template(soundTemplateString),

		attributes: {
			draggable: true
		},

		events: {
			"mouseenter": function (event) {
				this.eventBus.trigger("overSoundExtended");
			},

			"mouseleave": function (event) {
				this.eventBus.trigger("outSoundExtended");
			},

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
			}
		},

		render: function () {
			this.$el.html(this.soundTemplate(this.model.toJSON()));

			return this;
		}
	});

	_.extend(SoundView.prototype, dragDropMixIn(BaseView));

	return SoundView;
});

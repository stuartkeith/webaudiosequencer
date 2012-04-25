define([
	"jquery",
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/soundBrowser/sound.html"
], function($, _, Backbone, BaseView, soundTemplateString) {
	var SoundView = BaseView.extend({
		className: "sound",

		soundTemplate: _.template(soundTemplateString),

		attributes: {
			draggable: true
		},

		render: function () {
			this.$el.html(this.soundTemplate(this.model.toJSON()));

			return this;
		}
	});

	return SoundView;
});

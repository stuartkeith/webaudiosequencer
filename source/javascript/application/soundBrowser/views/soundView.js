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

		soundTemplate: _.template(soundTemplateString),

		events: {
			"click .add": function (event) {
				this.eventBus.trigger("requestTrack", {
					pageX: event.pageX,
					pageY: event.pageY,
					soundModel: this.model
				});
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

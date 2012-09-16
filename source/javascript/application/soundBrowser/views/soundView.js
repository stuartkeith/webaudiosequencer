define(function (require) {
	var $ = require("jquery"),
	    _ = require("underscore"),
	    Backbone = require("backbone"),
	    BaseView = require("baseView"),
	    SoundButtonView = require("application/soundButtonView"),
	    DraggableView = require("./draggableView"),
	    soundTemplateString = require("text!templates/soundBrowser/sound.html");

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

				var soundButton = this.$el.find(".sound-button:first");
				var draggable = this.$el.find(".draggable:first");

				this.addChildView(SoundButtonView, {
					el: soundButton,
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

define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/trackControls/trackControl.html"
], function(_, Backbone, BaseView, trackControlTemplateString) {
	var TrackControlView = BaseView.extend({
		className: "track-control",
		trackControlTemplate: _.template(trackControlTemplateString),

		events: {
			"click .close": function (event) {
				this.eventBus.trigger("removeTrack", this.model);
			}
		},

		modelEvents: {
			"remove": function () {
				this.remove();
			}
		},

		render: function () {
			this.$el.html(this.trackControlTemplate());

			return this;
		}
	});

	return TrackControlView;
});

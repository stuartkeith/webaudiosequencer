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
			"click .select": function (event) {
				this.eventBus.trigger("selectTrack", {
					trackModel: this.model
				});
			},

			"click .close": function (event) {
				this.eventBus.trigger("removeTrack", {
					trackModel: this.model
				});
			}
		},

		eventBusEvents: {
			"trackSelected": function (trackModel) {
				this.select.toggleClass("selected", trackModel === this.model);
			}
		},

		modelEvents: {
			"remove": function () {
				this.remove();
			}
		},

		render: function () {
			this.$el.html(this.trackControlTemplate());

			this.select = this.$el.find(".select:first");

			return this;
		}
	});

	return TrackControlView;
});

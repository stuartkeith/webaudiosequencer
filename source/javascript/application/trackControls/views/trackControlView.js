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
			"click .track-control-select": function (event) {
				this.trigger("selectTrack", this.model);
			},

			"click .remove-track": function (event) {
				this.trigger("removeTrack", this.model);
			}
		},

		modelEvents: {
			"change:selected": "updateSelect",

			"remove": function () {
				this.trigger("removeTrackControl", this);
			}
		},

		render: function () {
			this.$el.html(this.trackControlTemplate());

			this.select = this.$el.find(".track-control-select:first");

			this.updateSelect();

			this.$el.find(".remove-track:first").button({
				icons: {
					primary: "sprite-buttons-remove"
				},

				text: false
			});

			return this;
		},

		updateSelect: function () {
			this.select.toggleClass("track-control-selected", this.model.get('selected'));
		}
	});

	return TrackControlView;
});

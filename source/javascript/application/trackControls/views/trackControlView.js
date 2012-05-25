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
				this.trigger("selectTrack", this.model);
			},

			"click .close": function (event) {
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

			this.select = this.$el.find(".select:first");

			this.updateSelect();

			return this;
		},

		updateSelect: function () {
			this.select.toggleClass("selected", this.model.get('selected'));
		}
	});

	return TrackControlView;
});

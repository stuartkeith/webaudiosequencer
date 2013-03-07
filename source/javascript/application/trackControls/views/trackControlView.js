define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    buttonHelpers = require("utilities/buttonHelpers"),
	    trackControlTemplateString = require("text!templates/trackControls/trackControl.html");

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

			this.select = this.$(".track-control-select:first");

			// store the title so it can added and removed later
			this.selectTitle = this.select.attr("title");

			this.updateSelect();

			buttonHelpers.button(this.$(".remove-track:first"), "sprite-buttons-remove");

			return this;
		},

		updateSelect: function () {
			var modelSelected = this.model.get('selected');

			this.select.attr("title", modelSelected ? "" : this.selectTitle);
			this.select.toggleClass("track-control-selected", modelSelected);
		}
	});

	return TrackControlView;
});

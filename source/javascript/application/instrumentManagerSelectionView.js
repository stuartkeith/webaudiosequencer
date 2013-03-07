define(function(require) {
	var BaseView = require("baseView"),
	    buttonHelpers = require("utilities/buttonHelpers"),
	    instrumentManagerSelectionTemplateString = require("text!templates/instrumentManagerSelection.html")

	var InstrumentManagerSelectionView = BaseView.extend({
		className: "instrument-manager-selection-view",

		events: {
			"click #melodic-option": function () {
				this.triggerCreateTrack("melodic");
			},

			"click #percussive-option": function () {
				this.triggerCreateTrack("percussive");
			}
		},

		triggerCreateTrack: function (instrumentManagerType) {
			this.eventBus.trigger("createTrack", {
				instrumentManagerType: instrumentManagerType,
				soundAttributes: this.model.attributes
			});
		},

		render: function () {
			this.$el.html(instrumentManagerSelectionTemplateString);

			this.$("button").each(function (index, element) {
				buttonHelpers.button($(element));
			});

			return this;
		}
	});

	return InstrumentManagerSelectionView;
});

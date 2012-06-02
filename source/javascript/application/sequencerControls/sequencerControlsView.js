define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/sequencerControls/sequencerControls.html"
], function(_, Backbone, BaseView, sequencerControlsTemplateString) {
	var SequencerControlsView = BaseView.extend({
		bpmMinimum: 30,
		bpmMaximum: 300,
		sequencerControlsTemplate: _.template(sequencerControlsTemplateString),

		events: {
			"change .play-stop": function (event) {
				if (event.target.checked)
					this.eventBus.trigger("playSequencer");
				else
					this.eventBus.trigger("stopSequencer");
			},

			"change .bpm-number": "changeBPMInput",
			"change .bpm-slider": "changeBPMInput"
		},

		changeBPMInput: function (event) {
			this.eventBus.trigger("updateBPM", {
				bpm: event.target.value
			});
		},

		modelEvents: {
			"play": "updatePlayStopInput",
			"stop": "updatePlayStopInput",
			"bpm": "updateBPMInputs"
		},

		render: function () {
			this.$el.html(this.sequencerControlsTemplate());

			this.playStopInput = this.$el.find(".play-stop")[0];

			this.bpmNumber = this.$el.find(".bpm-number")[0];
			this.bpmNumber.min = this.bpmMinimum;
			this.bpmNumber.max = this.bpmMaximum;

			this.bpmSlider = this.$el.find(".bpm-slider")[0];
			this.bpmSlider.min = this.bpmMinimum;
			this.bpmSlider.max = this.bpmMaximum;

			this.updatePlayStopInput();
			this.updateBPMInputs();

			return this;
		},

		updatePlayStopInput: function () {
			this.playStopInput.checked = this.model.isPlaying;
		},

		updateBPMInputs: function () {
			this.bpmNumber.value = this.model.bpm;
			this.bpmSlider.value = this.model.bpm;
		}
	});

	return SequencerControlsView;
});

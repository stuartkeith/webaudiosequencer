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

			"change .bpm": function (event) {
				this.eventBus.trigger("updateBPM", {
					bpm: event.target.value
				});
			}
		},

		modelEvents: {
			"play": "updatePlayStopInput",
			"stop": "updatePlayStopInput",
			"bpm": "updateBPMInput"
		},

		render: function () {
			this.$el.html(this.sequencerControlsTemplate());

			this.playStopInput = this.$el.find(".play-stop")[0];

			this.bpmInput = this.$el.find(".bpm")[0];
			this.bpmInput.min = this.bpmMinimum;
			this.bpmInput.max = this.bpmMaximum;

			this.updatePlayStopInput();
			this.updateBPMInput();

			return this;
		},

		updatePlayStopInput: function () {
			this.playStopInput.checked = this.model.isPlaying;
		},

		updateBPMInput: function () {
			this.bpmInput.value = this.model.bpm;
		}
	});

	return SequencerControlsView;
});

define([
	"underscore",
	"backbone",
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

			this.playStop = this.$el.find(".play-stop:first");

			this.playStop.button({
				text: false
			});

			this.bpmNumber = this.$el.find(".bpm-number:first")[0];
			this.bpmNumber.min = this.bpmMinimum;
			this.bpmNumber.max = this.bpmMaximum;

			this.bpmSlider = this.$el.find(".bpm-slider:first")[0];
			this.bpmSlider.min = this.bpmMinimum;
			this.bpmSlider.max = this.bpmMaximum;

			this.updatePlayStopInput();
			this.updateBPMInputs();

			return this;
		},

		updatePlayStopInput: function () {
			var iconName = "sprite-buttons-";
			iconName += this.model.isPlaying ? "stop" : "play";
			iconName += "-large";

			this.playStop.prop("checked", this.model.isPlaying);

			this.playStop.button("option", "icons", {
				primary: iconName
			});

			this.playStop.button("refresh");
		},

		updateBPMInputs: function () {
			this.bpmNumber.value = this.model.bpm;
			this.bpmSlider.value = this.model.bpm;
		}
	});

	return SequencerControlsView;
});

define([
	"use!underscore",
	"use!backbone",
	"./sequence"
], function(_, Backbone, Sequence) {
	var Sequencer = function () {
		this.sequences = [];

		this.isPlaying = false;
	};

	_.extend(Sequencer.prototype, Backbone.Events, {
		play: function () {
			if (!this.isPlaying) {
				this.isPlaying = true;

				this.update();
			}
		},

		stop: function () {
			this.isPlaying = false;
		},

		update: function () {
			_.each(this.sequences, function (sequence) {
				sequence.update();
			});

			if (this.isPlaying)
				setTimeout(_.bind(this.update, this), 1000);
		},

		addSequence: function (length) {
			var sequence = new Sequence(length);

			this.sequences.push(sequence);

			this.trigger("sequenceAdded", sequence);

			return sequence;
		},

		removeSequence: function (sequence) {
			var index = this.sequences.indexOf(sequence);

			if (index >= 0) {
				this.sequences.splice(index, 1);

				sequence.trigger("removed");
				this.trigger("sequenceRemoved", sequence);

				return true;
			} else {
				return false;
			}
		}
	});

	return Sequencer;
});

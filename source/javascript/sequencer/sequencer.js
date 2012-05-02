define([
	"use!backbone",
	"./sequence"
], function(Backbone, Sequence) {
	var Sequencer = function () {
		this.sequences = [];
	};

	_.extend(Sequencer.prototype, Backbone.Events, {
		addSequence: function () {
			var sequence = new Sequence();

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

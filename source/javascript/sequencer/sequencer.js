define(function(require) {
	var _ = require("underscore"),
	    Backbone = require("backbone");

	var Sequencer = function (sequence, position) {
		this.sequence = sequence;

		this.position = position || 0;
	};

	_.extend(Sequencer.prototype, Backbone.Events, {
		getLength: function () {
			return this.sequence.getLength();
		},

		next: function () {
			var notes = this.sequence.getNotesAt(this.position),
			    newPosition = this.position + 1;

			this.trigger("update", this.position);

			this.position = newPosition < this.sequence.getLength() ? newPosition : 0;

			return notes;
		}
	});

	return Sequencer;
});

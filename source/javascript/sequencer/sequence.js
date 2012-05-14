define([
	"use!backbone",
	"utilities/array2d"
], function(Backbone, Array2d) {
	var Sequence = function (length) {
		this._length = length;
		this.notes = new Array2d();
		this.position = 0;
	};

	_.extend(Sequence.prototype, Backbone.Events, {
		getNoteAt: function (location) {
			return this.notes.get(location);
		},

		update: function () {
			if (this.instrumentManager) {
				var notes = this.notes._columns[this.position];

				if (notes)
					this.instrumentManager.receiveNotes(notes);
			}

			this.trigger("update", this.position);

			var nextPosition = this.position + 1;

			this.position = nextPosition < this._length ? nextPosition : 0;
		},

		getLength: function () {
			return this._length;
		},

		setLength: function (length) {
			this._length = length;

			if (this.position >= this._length)
				this.position = 0;
		},

		addNoteAt: function (location, data) {
			if (this.getNoteAt(location))
				this.trigger("note:removed", location);

			this.notes.set(location, data);

			this.trigger("note:added", location, data);
		},

		removeNoteAt: function (location) {
			if (this.notes.clear(location))
				this.trigger("note:removed", location);
		},

		toggleNoteAt: function (location, data) {
			if (this.getNoteAt(location)) {
				this.removeNoteAt(location);

				return false;
			} else {
				this.addNoteAt(location, data);

				return true;
			}
		}
	});

	return Sequence;
});

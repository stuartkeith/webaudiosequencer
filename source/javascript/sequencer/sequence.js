define([
	"use!backbone",
	"utilities/array2d"
], function(Backbone, Array2d) {
	var Sequence = function (length) {
		this._length = length;
		this.notes = new Array2d();
	};

	_.extend(Sequence.prototype, Backbone.Events, {
		getNoteAt: function (location) {
			return this.notes.get(location);
		},

		update: function (position) {
			if (position >= this._length)
				position %= this._length;

			if (this.instrumentManager) {
				var notes = this.notes._columns[position];

				if (notes)
					this.instrumentManager.receiveNotes(notes);
			}

			this.trigger("update", position);
		},

		getLength: function () {
			return this._length;
		},

		setLength: function (length) {
			this._length = length;
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

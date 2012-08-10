define([
	"backbone",
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

		update: function (position, delay) {
			if (position >= this._length)
				position %= this._length;

			var notes = this.notes._columns[position];

			this.trigger("update", position, notes, delay);
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

		removeNotesAt: function (options) {
			this.notes.each(function (location) {
				this.removeNoteAt(location);
			}, this, options);
		},

		shiftNotesAt: function (x, y, options) {
			this.notes.each(function (location) {
				this.removeNoteAt(location);

				location.x += x;
				location.y += y;

				this.addNoteAt(location, true);
			}, this, options);
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

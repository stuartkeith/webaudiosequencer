define(function(require) {
	var Backbone = require("backbone"),
	    Array2d = require("utilities/array2d");

	var Sequence = function (length) {
		this._length = length;
		this.notes = new Array2d();
	};

	_.extend(Sequence.prototype, Backbone.Events, {
		getNoteAt: function (location) {
			return this.notes.get(location);
		},

		getNotesAt: function (position) {
			return this.notes._columns[position];
		},

		getLength: function () {
			return this._length;
		},

		setLength: function (length) {
			this._length = length;
		},

		addNoteAt: function (location, data) {
			var data = data || true;

			if (this.getNoteAt(location))
				this.trigger("note:removed", location);

			this.notes.set(location, data);

			this.trigger("note:added", location, data);
		},

		removeNoteAt: function (location) {
			var existingData = this.notes.clear(location);

			if (existingData)
				this.trigger("note:removed", location);

			return existingData;
		},

		removeNotesAt: function (options) {
			this.notes.each(function (location) {
				this.removeNoteAt(location);
			}, this, options);
		},

		shiftNotesAt: function (x, y, options) {
			var existingData;

			this.notes.each(function (location) {
				existingData = this.removeNoteAt(location);

				location.x += x;
				location.y += y;

				this.addNoteAt(location, existingData);
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

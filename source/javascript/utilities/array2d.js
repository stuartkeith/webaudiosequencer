define([
	"underscore"
], function() {
	var Array2d = function () {
		this._columns = {};
	};

	Array2d.prototype.get = function(location) {
		var row = this._columns[location.x];

		if (row)
			return row[location.y];
	};

	Array2d.prototype.set = function (location, value) {
		var row = this._columns[location.x] || (this._columns[location.x] = {});

		if (row[location.y])
			return false;

		row[location.y] = value;

		return true;
	};

	Array2d.prototype.each = function (callback, context, options) {
		var context = context || this;
		var options = options || {};

		var location = {};

		_.each(this._columns, function (data, outerKey) {
			location.x = parseInt(outerKey, 10);

			if (options.left != null && location.x < options.left)
				return;

			if (options.right != null && location.x > options.right)
				return;

			_.each(data, function (data, innerKey) {
				location.y = parseInt(innerKey, 10);

				if (options.top != null && location.y < options.top)
					return;

				if (options.bottom != null && location.y > options.bottom)
					return;

				callback.call(context, location, data);
			});
		});
	};

	Array2d.prototype.clear = function (location) {
		var row = this._columns[location.x];
		
		if (!row)
			return false;

		var value = row[location.y];

		if (!value)
			return false;

		delete row[location.y];

		return value;
	};

	return Array2d;
});

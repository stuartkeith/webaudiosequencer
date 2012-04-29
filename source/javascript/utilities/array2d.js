define(function() {
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

	Array2d.prototype.clear = function (location) {
		var row = this._columns[location.x];
		
		if (!row)
			return false;

		var value = row[location.y];

		if (value) {
			delete row[location.y];

			return value;
		}

		return false;
	};

	return Array2d;
});

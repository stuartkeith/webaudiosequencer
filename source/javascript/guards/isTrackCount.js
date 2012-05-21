define(function () {
	var isTrackCount = function (count, invert) {
		return function () {
			if (invert)
				return this.trackCollection.length !== count;
			else
				return this.trackCollection.length === count;
		};
	};

	return isTrackCount;
});

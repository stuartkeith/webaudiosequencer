define(function () {
	var isTrackCountZero = function (invert) {
		return function () {
			if (invert)
				return this.trackCollection.length > 0;
			else
				return this.trackCollection.length === 0;
		};
	};

	return isTrackCountZero;
});

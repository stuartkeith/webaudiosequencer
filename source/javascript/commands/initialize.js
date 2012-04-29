define(function () {
	var initialize = function (eventBus) {
		return function () {
			eventBus.trigger("addTrack");
		};
	};

	return initialize;
});


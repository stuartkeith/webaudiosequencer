define(function () {
	var documentListeners = function (eventBus) {
		document.addEventListener("webkitvisibilitychange", function (event) {
			if (document.webkitHidden)
				eventBus.trigger("stopSequencer");
		}, false);
	};

	return documentListeners;
});

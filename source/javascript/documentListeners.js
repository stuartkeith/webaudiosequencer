define(function () {
	var documentListeners = function (eventBus) {
		document.addEventListener("webkitvisibilitychange", function (event) {
			if (document.webkitHidden)
				eventBus.trigger("stopPlayback");
		}, false);
	};

	return documentListeners;
});

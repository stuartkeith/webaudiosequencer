define(function (require) {
	var $ = require("jquery");

	var keyboardShortcuts = function (eventBus) {
		$(document.documentElement).keydown(function (event) {
			// number keys 1 to 0
			var index = event.which - 49;

			if (index >= 0 && index <= 10) {
				eventBus.trigger("selectTrack", {
					trackIndex: index
				});

				return;
			}
		});
	};

	return keyboardShortcuts;
});

define(function (require) {
	var $ = require("jquery");

	var keyboardShortcuts = function (eventBus) {
		$(document.documentElement).keydown(function (event) {
			// spacebar
			if (event.which === 32) {
				eventBus.trigger("toggleSequencer");

				event.preventDefault();

				return;
			}

			// number keys 1 to 0
			var index = event.which - 49;

			if (index >= 0 && index <= 10) {
				eventBus.trigger("selectTrack", {
					trackIndex: index
				});

				event.preventDefault();

				return;
			}
		});
	};

	return keyboardShortcuts;
});

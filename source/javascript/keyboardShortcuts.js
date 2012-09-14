define(function (require) {
	var documentKeyboardHandler = require("utilities/documentKeyboardHandler");

	var keyboardShortcuts = function (eventBus) {
		documentKeyboardHandler(function (event, isDown, isRepeated) {
			// spacebar
			if (isDown && event.which === 32) {
				if (!isRepeated)
					eventBus.trigger("togglePlayback");

				return false;
			}

			// number keys 1 to 9
			if (isDown && event.which >= 49 && event.which <= 57) {
				if (!isRepeated)
					eventBus.trigger("selectTrack", {
						trackIndex: event.which - 49
					});

				return false;
			}
		});
	};

	return keyboardShortcuts;
});

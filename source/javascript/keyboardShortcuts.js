define(function (require) {
	var $ = require("jquery");
	var documentKeyboardHandler = require("utilities/documentKeyboardHandler");

	var keyboardShortcuts = function (eventBus) {
		documentKeyboardHandler(function (event, isDown, isRepeated) {
			// spacebar
			if (isDown && event.which === 32) {
				if (!isRepeated)
					eventBus.trigger("togglePlayback");

				return false;
			}

			// shift
			if (event.which === 16) {
				if (!isRepeated) {
					eventBus.trigger("setGridViewState", {
						state: isDown ? "play" : "addOrRemove"
					});
				}

				return false;
			}

			// number keys 1 to 9
			if (isDown && event.which >= 49 && event.which <= 57) {
				if ($(event.target).is("input"))
					return;

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

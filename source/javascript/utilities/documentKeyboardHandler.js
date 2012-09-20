define(function (require) {
	var $ = require("jquery");

	var shiftKey = 16;

	var dummyShiftKeyboardEvent = {
		type: "keyup",
		preventDefault: function () { },
		which: shiftKey
	};

	var documentKeyboardHandler = function (handler) {
		// keeps track of which keys have already been pressed,
		// so we can keep track of which key is a repeated event.
		var keysDown = [];

		var keyboardListener = function (event) {
			var keyIsDown = event.type === "keydown",
			    keyIsRepeated = keyIsDown ? keysDown[event.which] : false;

			keysDown[event.which] = keyIsDown;

			if (handler(event, keyIsDown, keyIsRepeated) === false) {
				event.preventDefault();

				return false;
			}
		};

		// if the user releases the shift key after mousing out of the
		// document, the event will not be captured. if this occurs,
		// simulate the shift key being released when the mouse re-enters
		// the document.
		var mouseEnterListener = function (event) {
			if (keysDown[shiftKey] && !event.shiftKey) {
				keyboardListener(dummyShiftKeyboardEvent);
			}
		};

		$(document.documentElement).keyup(keyboardListener);
		$(document.documentElement).keydown(keyboardListener);
		$(document.documentElement).mouseenter(mouseEnterListener);
	};

	return documentKeyboardHandler;
});

define(function (require) {
	var $ = require("jquery");

	var documentKeyboardHandler = function (handler) {
		// keeps track of which keys have already been pressed,
		// so we can keep track of which key is a repeated event.
		var keysDown = [];

		this.keyboardListener = function (event) {
			var keyIsDown = event.type === "keydown",
			    keyIsRepeated = keyIsDown ? keysDown[event.which] : false;

			keysDown[event.which] = keyIsDown;

			if (handler(event, keyIsDown, keyIsRepeated) === false) {
				event.preventDefault();

				return false;
			}
		}

		$(document.documentElement).keyup(keyboardListener);
		$(document.documentElement).keydown(keyboardListener);
	};

	return documentKeyboardHandler;
});

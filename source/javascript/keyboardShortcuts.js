define([
	"jquery"
], function ($) {
	var keyboardShortcuts = function (eventBus) {
		$(document.documentElement).keydown(function (event) {
			var index = event.which - 49;

			if (index >= 0 && index <= 10)
				eventBus.trigger("selectTrack", {
					trackIndex: index
				});
		});
	};

	return keyboardShortcuts;
});

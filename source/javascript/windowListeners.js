define(function (require) {
	var $ = require("jquery");

	var windowListeners = function (eventBus) {
		$(window).blur(function () {
			eventBus.trigger('stopSequencer');
		});
	};

	return windowListeners;
});
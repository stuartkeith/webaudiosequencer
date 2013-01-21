define(function (require) {
	var $ = require("jquery"),
	    _ = require("underscore");

	var html = $("html"),
	    listeners = [];

	// Listen for a click event anywhere in the document.
	//
	// If the target of the click event is not $element (or a descendant of
	// $element), and the listener has first processed a mousedown event,
	// then the callback is executed.
	//
	// This avoids a click event listener registered within another click
	// listener immediately being triggered due to event bubbling.
	//
	// $element may be null/undefined.
	var globalClickListener = function ($element, callback, context) {
		var listener = new Listener($element, callback, context);

		// add to beginning of array (array is processed in reverse)
		if (listeners.unshift(listener) === 1)
			addEventListeners();
	};

	var Listener = function ($element, callback, context) {
		this.$element = $element;
		this.callback = callback;
		this.context = context || window;
		this.isActive = false; // has this been processed by startHandler?
	};

	var addEventListeners = function () {
		html.on("mousedown", startHandler);
		html.on("click", endHandler);
	};

	var removeEventListeners = function () {
		html.off("mousedown", startHandler);
		html.off("click", endHandler);
	};

	var startHandler = function (event) {
		_.each(listeners, function (listener) {
			listener.isActive = true;
		});
	};

	var endHandler = function (event) {
		var listener,
			$element,
		    $target = $(event.target);

		for (var i = listeners.length - 1; i >= 0; i--) {
			listener = listeners[i];

			// if the listener was created after startHandler was called,
			// ignore it
			if (!listener.isActive)
				continue;

			$element = listener.$element;

			// if the target is either the element or one of the element's
			// children, ignore it
			if ($element) {
				if ($target.is($element))
					continue;

				if ($target.parents().index($element) !== -1)
					continue;
			}

			listeners.splice(i, 1);

			listener.callback.call(listener.context);
		}

		if (listeners.length === 0)
			removeEventListeners();
	};

	return globalClickListener;
});

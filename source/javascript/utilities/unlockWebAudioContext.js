define(function (require) {
	// the web audio context may be suspended on startup
	// wait for user interaction events and resume

	var interactionEvents = ['mousedown', 'touchend'];

	var unlockContext = function (context) {
		if (context.state !== 'suspended') {
			return;
		}

		var onResume = function () {
			context.resume().then(function () {
				_.each(interactionEvents, function (key) {
					document.body.removeEventListener(key, onResume);
				});
			});
		};

		_.each(interactionEvents, function (key) {
			document.body.addEventListener(key, onResume);
		});
	}

	return unlockContext;
});

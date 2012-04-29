define(function () {
	var playSoundAttributes = function (eventBus, soundOutput) {
		return function (soundAttributes, deferred) {
			deferred.notify("loading");

			var loadDeferred = soundOutput.loadSoundAttributes(soundAttributes);

			loadDeferred.fail(function (error, data) {
				deferred.reject(error, data);
			});

			loadDeferred.done(function (soundObject) {
				deferred.notify("playing");

				soundOutput.playSoundObject(soundObject, 1, 0, function () {
					soundOutput.freeSoundAttributes(soundAttributes);

					deferred.resolve();
				});
			});
		};
	};

	return playSoundAttributes;
});


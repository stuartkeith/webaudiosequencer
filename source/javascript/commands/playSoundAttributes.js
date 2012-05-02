define(function () {
	var playSoundAttributes = function (soundAttributes, deferred) {
		deferred.notify("loading");

		var loadDeferred = this.soundOutput.loadSoundAttributes(soundAttributes);

		loadDeferred.fail(function (error, data) {
			deferred.reject(error, data);
		});

		loadDeferred.done(function (soundObject) {
			deferred.notify("playing");

			this.soundOutput.playSoundObject(soundObject, 0, 0, function () {
				this.soundOutput.freeSoundAttributes(soundAttributes);

				deferred.resolve();
			}.bind(this));
		}.bind(this));
	};

	return playSoundAttributes;
});


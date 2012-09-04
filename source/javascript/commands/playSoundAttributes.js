define(function () {
	var playSoundAttributes = function (args) {
		var soundAttributes = args.soundAttributes;
		var deferred = args.deferred;

		if (deferred)
			deferred.notify("loading");

		var loadDeferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		if (deferred) {
			loadDeferred.fail(function (error, data) {
				deferred.reject(error, data);
			});
		}

		loadDeferred.done(function (buffer) {
			if (deferred)
				deferred.notify("playing");

			this.soundOutput.playBuffer(buffer, 0, 1, 0, function () {
				this.soundOutput.freeSoundURL(soundAttributes.sound_url);

				if (deferred)
					deferred.resolve();
			}.bind(this));
		}.bind(this));
	};

	return playSoundAttributes;
});


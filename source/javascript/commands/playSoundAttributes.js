define(function () {
	var playSoundAttributes = function (args) {
		var soundAttributes = args.soundAttributes;
		var deferred = args.deferred;
		var note = args.note || 0;
		var volume = args.volume == null ? 1 : args.volume;
		var delay = args.delay || 0;

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

			this.soundOutput.playBuffer(buffer, note, volume, delay, function () {
				this.soundOutput.freeSoundURL(soundAttributes.sound_url);

				if (deferred)
					deferred.resolve();
			}.bind(this));
		}.bind(this));
	};

	return playSoundAttributes;
});

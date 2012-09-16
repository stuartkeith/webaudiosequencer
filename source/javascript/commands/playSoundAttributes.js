define(function () {
	var playSoundAttributes = function (args) {
		var soundAttributes = args.soundAttributes,
		    deferred = args.deferred;
		    note = args.note || 0,
		    volume = args.volume == null ? 1 : args.volume,
		    delay = args.delay || 0;

		if (deferred)
			deferred.notify("loading");

		var loadDeferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		if (deferred)
			loadDeferred.fail(deferred.reject);

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

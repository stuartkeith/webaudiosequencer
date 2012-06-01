define(function () {
	var playSoundAttributes = function (args) {
		var soundAttributes = args.soundAttributes;
		var deferred = args.deferred;

		deferred.notify("loading");

		var loadDeferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		loadDeferred.fail(function (error, data) {
			deferred.reject(error, data);
		});

		loadDeferred.done(function (buffer) {
			deferred.notify("playing");

			this.soundOutput.playBuffer(buffer, 0, 1, 0, function () {
				this.soundOutput.freeSoundURL(soundAttributes.sound_url);

				deferred.resolve();
			}.bind(this));
		}.bind(this));
	};

	return playSoundAttributes;
});


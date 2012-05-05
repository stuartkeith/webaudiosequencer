define([
], function () {
	var updateInstrument = function (instrument, soundAttributes) {
		instrument.buffer = null;

		if (instrument.soundAttributes)
			this.soundOutput.freeSoundURL(instrument.soundAttributes.url);

		instrument.isLoading = true;
		instrument.soundAttributes = soundAttributes;

		instrument.changed();

		var deferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		deferred.fail(function () {
			instrument.isLoading = false;

			instrument.changed();
		});

		deferred.done(function (buffer) {
			instrument.buffer = buffer;
			instrument.isLoading = false;

			instrument.changed();
		});
	};

	return updateInstrument;
});


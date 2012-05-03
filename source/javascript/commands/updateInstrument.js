define([
], function () {
	var updateInstrument = function (instrument, soundAttributes) {
		instrument.buffer = null;

		if (instrument.soundAttributes)
			this.soundOutput.freeSoundURL(instrument.soundAttributes.url);

		instrument.isLoading = true;
		instrument.soundAttributes = soundAttributes;

		var deferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		deferred.always(function () {
			instrument.isLoading = false;
		});

		deferred.done(function (buffer) {
			instrument.buffer = buffer;
		});
	};

	return updateInstrument;
});


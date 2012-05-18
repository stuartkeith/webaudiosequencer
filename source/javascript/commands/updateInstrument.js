define([
], function () {
	var updateInstrument = function (args) {
		var instrument = args.instrument;
		var soundAttributes = args.soundAttributes;

		instrument.buffer = null;

		if (instrument.soundAttributes)
			this.soundOutput.freeSoundURL(instrument.soundAttributes.url);

		// this instrument might just be removing itself.
		if (!soundAttributes)
			return;

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


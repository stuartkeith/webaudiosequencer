define(function () {
	var updateInstrument = function (args) {
		var instrument = args.instrument,
		    soundAttributes = args.soundAttributes,
		    deferred;

		instrument.buffer = null;

		if (instrument.soundAttributes)
			this.soundOutput.freeSoundURL(instrument.soundAttributes.url);

		// this instrument might just be removing itself.
		if (!soundAttributes)
			return;

		instrument.state = instrument.STATE_LOADING;
		instrument.soundAttributes = soundAttributes;

		instrument.changed();

		deferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		deferred.fail(function () {
			instrument.state = instrument.STATE_ERROR;

			instrument.changed();
		});

		deferred.done(function (buffer) {
			instrument.buffer = buffer;
			instrument.state = instrument.STATE_LOADED;

			instrument.changed();
		});
	};

	return updateInstrument;
});


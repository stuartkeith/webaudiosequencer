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

		instrument.triggerChange();

		deferred = this.soundOutput.loadSoundURL(soundAttributes.sound_url);

		deferred.fail(function (reason, response) {
			instrument.state = instrument.STATE_ERROR;
			instrument.error.reason = reason;
			instrument.error.data = response;

			instrument.triggerError();
		});

		deferred.done(function (buffer) {
			instrument.buffer = buffer;
			instrument.state = instrument.STATE_READY;

			instrument.triggerChange();
		});
	};

	return updateInstrument;
});

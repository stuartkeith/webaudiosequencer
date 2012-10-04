define(function () {
	var setInstrumentVolume = function (args) {
		var instrumentModel = args.instrumentModel,
		    volume = args.volume;

		instrumentModel.setVolume(volume);
	};

	return setInstrumentVolume;
});

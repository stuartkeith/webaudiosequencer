define(function () {
	var setSoundOutputVolume = function (args) {
		this.soundOutput.setVolume(args.volume);
	};

	return setSoundOutputVolume;
});

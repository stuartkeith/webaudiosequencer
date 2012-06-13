define(function () {
	var setSoundOutputVolume = function (args) {
		this.soundOutput.setVolume(args.volume);

		localStorage.setItem("soundOutputVolume", args.volume);
	};

	return setSoundOutputVolume;
});

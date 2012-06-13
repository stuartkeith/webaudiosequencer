define(function () {
	var initialize = function () {
		var soundOutputVolume = localStorage.getItem("soundOutputVolume");

		if (soundOutputVolume != null)
			this.soundOutput.setVolume(soundOutputVolume);
	};

	return initialize;
});


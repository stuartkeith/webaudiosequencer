define([
	"commands/playSoundAttributes"
], function (playSoundAttributes) {
	var CommandMap = function (soundOutput) {
		return {
			playSoundAttributes: playSoundAttributes(soundOutput)
		};
	};

	return CommandMap;
});

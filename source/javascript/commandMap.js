define([
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes"
], function (addTrack, initialize, playSoundAttributes) {
	var CommandMap = function (eventBus, soundOutput, sequencer) {
		return {
			addTrack: addTrack(sequencer),
			initialize: initialize(eventBus),
			playSoundAttributes: playSoundAttributes(eventBus, soundOutput)
		};
	};

	return CommandMap;
});

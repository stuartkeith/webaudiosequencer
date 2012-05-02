define([
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/removeTrack"
], function (addTrack, initialize, playSoundAttributes, removeTrack) {
	var CommandMap = function (eventBus, soundOutput, sequencer) {
		return {
			addTrack: addTrack(eventBus, sequencer),
			initialize: initialize(eventBus),
			playSoundAttributes: playSoundAttributes(eventBus, soundOutput),
			removeTrack: removeTrack(eventBus, sequencer)
		};
	};

	return CommandMap;
});

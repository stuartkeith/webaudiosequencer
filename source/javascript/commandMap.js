define([
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/removeTrack",
	"commands/updateInstrument"
], function (addTrack, initialize, playSoundAttributes, removeTrack, updateInstrument) {
	return {
		addTrack: addTrack,
		initialize: initialize,
		playSoundAttributes: playSoundAttributes,
		removeTrack: removeTrack,
		updateInstrument: updateInstrument
	};
});

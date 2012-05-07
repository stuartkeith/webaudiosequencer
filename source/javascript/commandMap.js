define([
	"commands/addInstrument",
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/removeTrack",
	"commands/updateInstrument"
], function (addInstrument, addTrack, initialize, playSoundAttributes, removeTrack, updateInstrument) {
	return {
		addInstrument: addInstrument,
		addTrack: addTrack,
		initialize: initialize,
		playSoundAttributes: playSoundAttributes,
		removeTrack: removeTrack,
		updateInstrument: updateInstrument
	};
});

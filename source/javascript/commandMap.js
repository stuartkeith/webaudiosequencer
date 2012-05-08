define([
	"commands/addInstrument",
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/removeInstrument",
	"commands/removeTrack",
	"commands/updateInstrument"
], function (addInstrument, addTrack, initialize, playSoundAttributes, removeInstrument, removeTrack, updateInstrument) {
	return {
		addInstrument: addInstrument,
		addTrack: addTrack,
		initialize: initialize,
		playSoundAttributes: playSoundAttributes,
		removeInstrument: removeInstrument,
		removeTrack: removeTrack,
		updateInstrument: updateInstrument
	};
});

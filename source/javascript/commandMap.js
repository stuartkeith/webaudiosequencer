define([
	"commands/addInstrument",
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/removeInstrument",
	"commands/removeTrack",
	"commands/selectTrack",
	"commands/setSequencePosition",
	"commands/updateInstrument"
], function (addInstrument, addTrack, initialize, playSoundAttributes, removeInstrument, removeTrack, selectTrack, setSequencePosition, updateInstrument) {
	return {
		addInstrument: addInstrument,
		addTrack: addTrack,
		initialize: initialize,
		playSoundAttributes: playSoundAttributes,
		removeInstrument: removeInstrument,
		removeTrack: removeTrack,
		selectTrack: selectTrack,
		setSequencePosition: setSequencePosition,
		updateInstrument: updateInstrument
	};
});

define([
	"commands/addInstrument",
	"commands/addTrack",
	"commands/createTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/restartSequencer",
	"commands/removeInstrument",
	"commands/removeTrack",
	"commands/selectTrack",
	"commands/setSequencePosition",
	"commands/updateInstrument"
], function (addInstrument, addTrack, createTrack, initialize, playSoundAttributes, restartSequencer, removeInstrument, removeTrack, selectTrack, setSequencePosition, updateInstrument) {
	return {
		addInstrument: addInstrument,
		addTrack: addTrack,
		createTrack: createTrack,
		initialize: initialize,
		playSoundAttributes: playSoundAttributes,
		removeInstrument: removeInstrument,
		removeTrack: removeTrack,
		selectTrack: selectTrack,
		sequencePositionSet: restartSequencer,
		setSequencePosition: setSequencePosition,
		trackAdded: selectTrack,
		updateInstrument: updateInstrument
	};
});

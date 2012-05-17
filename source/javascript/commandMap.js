define([
	"commands/addInstrument",
	"commands/addTrack",
	"commands/createTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/restartSequencer",
	"commands/removeInstrument",
	"commands/removeTrack",
	"commands/selectPreviousTrack",
	"commands/selectTrack",
	"commands/setSequencePosition",
	"commands/updateInstrument",
	"guards/isSelectedTrack",
	"guards/isTrackCountZero"
], function (addInstrument, addTrack, createTrack, initialize, playSoundAttributes, restartSequencer, removeInstrument, removeTrack, selectPreviousTrack, selectTrack, setSequencePosition, updateInstrument, isSelectedTrack, isTrackCountZero) {
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
		trackRemoved: [[isSelectedTrack, isTrackCountZero(true)], selectPreviousTrack],
		updateInstrument: updateInstrument
	};
});

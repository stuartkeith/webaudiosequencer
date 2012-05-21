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
	var commandMap = {};

	var add = function (event, guards, successCommand, failureCommand) {
		var eventArray = commandMap[event] || (commandMap[event] = []);

		eventArray.push({
			guards: guards,
			successCommand: successCommand,
			failureCommand: failureCommand
		});
	};

	add('addInstrument', null, addInstrument),
	add('addTrack', null, addTrack),
	add('createTrack', null, createTrack),
	add('initialize', null, initialize),
	add('playSoundAttributes', null, playSoundAttributes),
	add('removeInstrument', null, removeInstrument),
	add('removeTrack', null, removeTrack),
	add('selectTrack', null, selectTrack),
	add('sequencePositionSet', null, restartSequencer),
	add('setSequencePosition', null, setSequencePosition),
	add('trackAdded', null, selectTrack),
	add('trackRemoved', [isSelectedTrack, isTrackCountZero(true)], selectPreviousTrack),
	add('updateInstrument', null, updateInstrument)

	return commandMap;
});

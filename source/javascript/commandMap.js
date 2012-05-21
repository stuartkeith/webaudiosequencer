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
	"commands/stopSequencer",
	"commands/updateInstrument",
	"guards/isSelectedTrack",
	"guards/isTrackCount"
], function (addInstrument, addTrack, createTrack, initialize, playSoundAttributes, restartSequencer, removeInstrument, removeTrack, selectPreviousTrack, selectTrack, setSequencePosition, stopSequencer, updateInstrument, isSelectedTrack, isTrackCount) {
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
	add('trackAdded', [isTrackCount(1)], restartSequencer);
	add('trackRemoved', [isSelectedTrack, isTrackCount(0, true)], selectPreviousTrack),
	add('trackRemoved', [isTrackCount(0)], stopSequencer),
	add('updateInstrument', null, updateInstrument)

	return commandMap;
});

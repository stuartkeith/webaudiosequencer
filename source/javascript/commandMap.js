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
	"commands/setInstrumentVolume",
	"commands/setSequencePosition",
	"commands/setSoundOutputVolume",
	"commands/stopSequencer",
	"commands/updateBPM",
	"commands/updateInstrument",
	"guards/isSelectedTrack",
	"guards/isTrackCount"
], function (addInstrument, addTrack, createTrack, initialize, playSoundAttributes, restartSequencer, removeInstrument, removeTrack, selectPreviousTrack, selectTrack, setInstrumentVolume, setSequencePosition, setSoundOutputVolume, stopSequencer, updateBPM, updateInstrument, isSelectedTrack, isTrackCount) {
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
	add('playSequencer', null, restartSequencer),
	add('playSoundAttributes', null, playSoundAttributes),
	add('removeInstrument', null, removeInstrument),
	add('removeTrack', null, removeTrack),
	add('selectTrack', null, selectTrack),
	add('sequencePositionSet', null, restartSequencer),
	add('setInstrumentVolume', null, setInstrumentVolume),
	add('setSequencePosition', null, setSequencePosition),
	add('setSoundOutputVolume', null, setSoundOutputVolume),
	add('stopSequencer', null, stopSequencer),
	add('trackAdded', null, selectTrack),
	add('trackAdded', [isTrackCount(1)], restartSequencer);
	add('trackRemoved', [isSelectedTrack, isTrackCount(0, true)], selectPreviousTrack),
	add('trackRemoved', [isTrackCount(0)], stopSequencer),
	add('updateBPM', null, updateBPM),
	add('updateInstrument', null, updateInstrument)

	return commandMap;
});

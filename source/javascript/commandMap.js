define(function (require) {
	var addInstrument = require("commands/addInstrument"),
	    addTrack = require("commands/addTrack"),
	    createTrack = require("commands/createTrack"),
	    initialize = require("commands/initialize"),
	    playSoundAttributes = require("commands/playSoundAttributes"),
	    restartPlayback = require("commands/restartPlayback"),
	    removeInstrument = require("commands/removeInstrument"),
	    removeTrack = require("commands/removeTrack"),
	    selectPreviousTrack = require("commands/selectPreviousTrack"),
	    selectTrack = require("commands/selectTrack"),
	    setInstrumentVolume = require("commands/setInstrumentVolume"),
	    setPlaybackPosition = require("commands/setPlaybackPosition"),
	    setSoundOutputVolume = require("commands/setSoundOutputVolume"),
	    shiftNotesUp = require("commands/shiftNotesUp"),
	    stopPlayback = require("commands/stopPlayback"),
	    togglePlayback = require("commands/togglePlayback"),
	    updateBPM = require("commands/updateBPM"),
	    updateInstrument = require("commands/updateInstrument"),
	    areTracksRemaining = require("guards/areTracksRemaining"),
	    isSelectedTrack = require("guards/isSelectedTrack"),
	    isTrackCount = require("guards/isTrackCount");

	var commandMap = {};

	var add = function (event, guards, successCommand, failureCommand) {
		var eventArray = commandMap[event] || (commandMap[event] = []);

		eventArray.push({
			guards: guards,
			successCommand: successCommand,
			failureCommand: failureCommand
		});
	};

	add('addInstrument', null, addInstrument);
	add('addTrack', [areTracksRemaining], addTrack);
	add('createTrack', [areTracksRemaining], createTrack);
	add('initialize', null, initialize);
	add('instrumentRemoved', null, shiftNotesUp);
	add('playSoundAttributes', null, playSoundAttributes);
	add('removeInstrument', null, removeInstrument);
	add('removeTrack', null, removeTrack);
	add('selectTrack', null, selectTrack);
	add('playbackPositionSet', null, restartPlayback);
	add('setInstrumentVolume', null, setInstrumentVolume);
	add('setPlaybackPosition', null, setPlaybackPosition);
	add('setSoundOutputVolume', null, setSoundOutputVolume);
	add('stopPlayback', null, stopPlayback);
	add('togglePlayback', null, togglePlayback);
	add('trackAdded', null, selectTrack);
	add('trackAdded', [isTrackCount(1)], restartPlayback);
	add('trackRemoved', [isSelectedTrack, isTrackCount(0, true)], selectPreviousTrack);
	add('trackRemoved', [isTrackCount(0)], stopPlayback);
	add('updateBPM', null, updateBPM);
	add('updateInstrument', null, updateInstrument);

	return commandMap;
});

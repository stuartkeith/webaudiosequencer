define([
	"commands/addTrack",
	"commands/initialize",
	"commands/playSoundAttributes",
	"commands/removeTrack"
], function (addTrack, initialize, playSoundAttributes, removeTrack) {
	return {
		addTrack: addTrack,
		initialize: initialize,
		playSoundAttributes: playSoundAttributes,
		removeTrack: removeTrack
	};
});

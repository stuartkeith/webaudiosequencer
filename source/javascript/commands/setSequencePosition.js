define(function () {
	var setSequencePosition = function (args) {
		this.sequencer.position = args.progressIndex;

		this.eventBus.trigger("sequencePositionSet", args);
	};

	return setSequencePosition;
});

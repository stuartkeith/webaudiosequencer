define(function () {
	var setSequencePosition = function (position) {
		this.sequencer.position = position;

		this.eventBus.trigger("sequencePositionSet", position);
	};

	return setSequencePosition;
});

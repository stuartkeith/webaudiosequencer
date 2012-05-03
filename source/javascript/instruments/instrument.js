define([
	"use!underscore",
	"use!backbone"
], function (_, Backbone) {
	var Instrument = function () {
		this.buffer = null;
		this.isLoading = false;
		this.soundExtended = null;
	};

	_.extend(Instrument.prototype, Backbone.Events);

	return Instrument;
});

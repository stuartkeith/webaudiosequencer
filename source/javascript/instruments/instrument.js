define([
	"use!underscore",
	"use!backbone"
], function (_, Backbone) {
	var Instrument = function () {
		this.buffer = null;
		this.isLoading = false;
		this.soundAttributes = null;
	};

	_.extend(Instrument.prototype, Backbone.Events, {
		changed: function () {
			this.trigger("changed");
		}
	});

	return Instrument;
});

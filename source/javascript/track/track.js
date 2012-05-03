define([
	"use!underscore",
	"use!backbone"
], function (_, Backbone) {
	var Track = function () {
		this.instrumentManager = null;
		this.sequence = null;
	};

	_.extend(Track.prototype, Backbone.Events, {
		remove: function () {
			this.trigger("remove");
		}
	});

	return Track;
});

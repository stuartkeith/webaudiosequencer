define([
	"use!underscore",
	"use!backbone"
], function (_, Backbone) {
	var TrackModel = Backbone.Model.extend({
		initialize: function () {
			this.attributes.instrumentManager = null;
			this.attributes.sequence = null;
			this.attributes.selected = false;
		}
	});

	return TrackModel;
});

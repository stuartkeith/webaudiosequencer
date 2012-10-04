define(function (require) {
	var _ = require("underscore"),
	    Backbone = require("backbone");

	var TrackModel = Backbone.Model.extend({
		initialize: function () {
			this.attributes.instrumentManager = null;
			this.attributes.sequence = null;
			this.attributes.selected = false;
		}
	});

	return TrackModel;
});

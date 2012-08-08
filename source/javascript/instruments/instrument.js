define([
	"underscore",
	"backbone"
], function (_, Backbone) {
	var Instrument = function () {
		this.buffer = null;
		this.isLoading = false;
		this.range = 0;
		this.soundAttributes = null;
		this.transpose = 0;
		this._volume = 1;
	};

	_.extend(Instrument.prototype, Backbone.Events, {
		changed: function () {
			this.trigger("changed");
		},

		remove: function () {
			this.trigger("remove");
		},

		getVolume: function () {
			return this._volume;
		},

		setVolume: function (value) {
			if (value !== this._volume) {
				this._volume = value;

				this.trigger("volume", value);
			}
		}
	});

	return Instrument;
});

define(function (require) {
	var _ = require("underscore"),
	    Backbone = require("backbone");

	var Instrument = function () {
		this.buffer = null;
		this.state = this.STATE_READY;
		this.range = 0;
		this.soundAttributes = null;
		this.transpose = 0;
		this._volume = 1;
		this.error = {
			reason: null,
			data: null
		};
	};

	_.extend(Instrument.prototype, Backbone.Events, {
		STATE_READY: "ready",
		STATE_LOADING: "loading",
		STATE_ERROR: "error",

		triggerChange: function () {
			this.trigger("change");
		},

		triggerError: function () {
			this.trigger("error");
		},

		triggerRemove: function () {
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

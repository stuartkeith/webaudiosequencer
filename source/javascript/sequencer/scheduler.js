define(function(require) {
	var _ = require("underscore"),
	    Backbone = require("backbone");

	var Scheduler = function (context, bpm) {
		this._context = context;

		this.isPlaying = false;
		this.setBPM(bpm);

		// ensure setTimeout callback has correct context
		this._updateBound = _.bind(this.update, this);
	};

	_.extend(Scheduler.prototype, Backbone.Events, {
		setTimeoutFrequency: 100,
		updateBufferSeconds: 0.2, // how far to look ahead for updates

		setBPM: function (value) {
			this.bpm = value;
			this._bpmSeconds = 60.0 / this.bpm;

			this.trigger("bpm", value);
		},

		play: function () {
			this.isPlaying = true;
			this._noteTime = 0;
			this._startTime = this._context.currentTime;

			this.update();

			this.trigger("play");
		},

		stop: function () {
			if (this.timeout) {
				clearTimeout(this.timeout);

				this.timeout = null;
			}

			this.isPlaying = false;

			this.trigger("stop");
		},

		toggle: function () {
			if (this.isPlaying)
				this.stop();
			else
				this.play();
		},

		update: function () {
			var currentTime = this._context.currentTime - this._startTime + this.updateBufferSeconds,
			    contextPlayTime;

			while (this._noteTime < currentTime) {
				contextPlayTime = this._startTime + this._noteTime;

				this.trigger("update", contextPlayTime);

				this._noteTime += this._bpmSeconds;
			}

			if (this.isPlaying)
				this.timeout = setTimeout(this._updateBound, this.setTimeoutFrequency);
		}
	});

	return Scheduler;
});

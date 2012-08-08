define([
	"underscore",
	"backbone",
	"./sequence"
], function(_, Backbone, Sequence) {
	var Sequencer = function (length) {
		this._length = length;

		this.position = 0;
		this.isPlaying = false;
		this.sequences = [];
		this.setBPM(120);
	};

	_.extend(Sequencer.prototype, Backbone.Events, {
		setLength: function (value) {
			this._length = value;

			if (this.position >= this._length)
				this.position = 0;
		},

		getLength: function () {
			return this._length;
		},

		setBPM: function (value) {
			if (this.bpm !== value) {
				this.bpm = value;
				this._timeout = Math.floor(60.0 / this.bpm * 1000);

				this.trigger("bpm", value);
			}
		},

		play: function (forceRestart) {
			if (forceRestart)
				this.stop();

			if (!this.isPlaying) {
				this.isPlaying = true;

				this.update();
			}

			this.trigger("play");
		},

		stop: function (resetPosition) {
			if (this.timeout) {
				clearTimeout(this.timeout);

				this.timeout = null;
			}

			this.isPlaying = false;

			if (resetPosition)
				this.position = 0;

			this.trigger("stop");
		},

		update: function () {
			_.each(this.sequences, function (sequence) {
				sequence.update(this.position);
			}, this);

			var newPosition = this.position + 1;

			this.position = newPosition < this._length ? newPosition : 0;

			if (this.isPlaying)
				this.timeout = setTimeout(_.bind(this.update, this), this._timeout);
		},

		addSequence: function (sequence) {
			this.sequences.push(sequence);

			this.trigger("sequenceAdded", sequence);

			return sequence;
		},

		removeSequence: function (sequence) {
			var index = this.sequences.indexOf(sequence);

			if (index >= 0) {
				this.sequences.splice(index, 1);

				sequence.trigger("removed");
				this.trigger("sequenceRemoved", sequence);

				return true;
			} else {
				return false;
			}
		}
	});

	return Sequencer;
});

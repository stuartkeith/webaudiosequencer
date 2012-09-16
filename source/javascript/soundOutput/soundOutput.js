define(function(require) {
	var $ = require("jquery"),
	    Backbone = require("backbone");

	var noteToPlaybackRate = [],
	    noteRange = 48,
	    noteRangeHalved = noteRange / 2;

	for (var i = 0; i < noteRange; i++)
		noteToPlaybackRate[i] = Math.pow(2, (i - noteRangeHalved) / 12);

	var SoundOutput = function (context) {
		this._context = context;

		this._gainNode = this._context.createGainNode();
		this._gainNode.connect(this._context.destination);

		this._deferredURLs = {};
	};

	_.extend(SoundOutput.prototype, Backbone.Events, {
		getVolume: function () {
			return this._gainNode.gain.value;
		},

		setVolume: function (volume) {
			if (volume !== this._gainNode.gain.value) {
				this._gainNode.gain.value = volume;

				this.trigger("volume", volume);
			}
		},

		playBuffer: function (buffer, note, volume, delay, callback) {
			var volume = volume != null ? volume : 1;
			var delay = delay || 0;
			var playbackRate;

			if (note != null)
				playbackRate = noteToPlaybackRate[note + noteRangeHalved];
			else
				playbackRate = 1;

			var gainNode = this._context.createGainNode();
			gainNode.gain.value = volume;
			gainNode.connect(this._gainNode);

			var bufferSource = this._context.createBufferSource();
			bufferSource.buffer = buffer;
			bufferSource.connect(gainNode);
			bufferSource.playbackRate.value = playbackRate;
			bufferSource.noteOn(delay);

			if (callback) {
				var relativeDelay = delay > 0 ? delay - this._context.currentTime : 0;
				// calculate total time in seconds.
				var time = relativeDelay + (buffer.duration / playbackRate);
				// convert to milliseconds for setTimeout.
				setTimeout(callback, time * 1000);
			}
		},

		freeSoundURL: function (url) {
			var existing = this._deferredURLs[url];

			if (existing) {
				if (existing.count === 1)
					delete this._deferredURLs[url];
				else
					existing.count--;
			}
		},

		loadSoundURL: function (url) {
			var existing = this._deferredURLs[url];

			if (existing) {
				existing.count++;

				return existing.promise;
			} else {
				var deferred = new $.Deferred();

				deferred.fail(function () {
					this.freeSoundURL(url);
				}.bind(this));

				var request = new XMLHttpRequest();
				request.open("GET", url, true);
				request.responseType = "arraybuffer";

				request.onloadend = function (event) {
					if (request.status === 200) {
						this._context.decodeAudioData(request.response,
							deferred.resolve,
							function () {
								deferred.reject('decode');
							});
					} else {
						deferred.reject('request', request);
					}
				}.bind(this);

				request.send();

				var promise = deferred.promise();

				this._deferredURLs[url] = { count: 1, promise: promise };

				return promise;
			}
		}
	});

	return SoundOutput;
});

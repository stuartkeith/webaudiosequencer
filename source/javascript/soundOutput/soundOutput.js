define([
	"use!backbone",
	"jquery"
], function(Backbone, $) {
	var noteToPlaybackRate = [];

	var noteRange = 48;
	var noteRangeHalved = noteRange / 2;

	for (var i = 0; i < noteRange; i++)
		noteToPlaybackRate[i] = Math.pow(2, (i - noteRangeHalved) / 12);

	var SoundOutput = function () {
		this._context = new webkitAudioContext();

		this._gainNode = this._context.createGainNode();
		this._gainNode.connect(this._context.destination);

		this._deferredURLs = {};
	};

	_.extend(SoundOutput.prototype, Backbone.Events, {
		getVolume: function () {
			return this._gainNode.gain.value;
		},

		setVolume: function (volume) {
			this._gainNode.gain.value = volume;

			this.trigger("volume", volume);
		},

		playBuffer: function (buffer, note, delay, callback) {
			var delay = delay || 0;
			var playbackRate;

			if (note != null)
				playbackRate = noteToPlaybackRate[note + noteRangeHalved];
			else
				playbackRate = 1;

			var bufferSource = this._context.createBufferSource();
			bufferSource.buffer = buffer;
			bufferSource.connect(this._gainNode);
			bufferSource.playbackRate.value = playbackRate;
			bufferSource.noteOn(delay ? this._context.currentTime + delay : 0);

			if (callback) {
				// calculate total time in seconds.
				var time = delay + (buffer.duration / playbackRate);
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

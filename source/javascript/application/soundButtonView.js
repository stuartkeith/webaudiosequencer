define(function (require) {
	var $ = require("jquery"),
	    _ = require("underscore"),
	    BaseView = require("baseView"),
	    buttonHelpers = require("utilities/buttonHelpers"),
	    soundError = require("text!templates/soundBrowser/soundError.txt"),
	    generateHSM = require("utilities/generateHSM"),
	    Alertify = require("alertify");

	var SoundButtonView = BaseView.extend({
		soundErrorTemplate: _.template(soundError.trim()),

		withOptions: function (fn, context) {
			var options = this.$el.data("options");

			if (options)
				fn.call(this, options);
		},

		HSM: generateHSM(["play", "load", "stop", "error"], {
			ready: {
				play: function () {
					this.view.playSoundAttributes();

					return this.rootState.busy.loading;
				},

				idle: {
					enter: function () {
						this.view.setIconAndLabel("play");
					}
				},

				showingError: {
					enter: function () {
						this.view.setIconAndLabel("error", this.view.lastErrorDescription);

						Alertify.dialog.confirm(this.view.lastErrorDescription, function () {
							this.play();
						}.bind(this));
					}
				}
			},

			busy: {
				enter: function () {
					this.view.withOptions(function (options) {
						options.disable(true);
					});

					this.view.$el.addClass("sound-button-view-loading");
				},

				exit: function () {
					this.view.$el.removeClass("sound-button-view-loading");

					this.view.withOptions(function (options) {
						options.disable(false);
					});
				},

				loading: {
					enter: function () {
						this.view.setIconAndLabel("loading");
					},

					play: function () {
						return this.rootState.busy.playing;
					},

					error: function () {
						return this.rootState.ready.showingError;
					}
				},

				playing: {
					enter: function () {
						this.view.setIconAndLabel("playing");
					},

					stop: function () {
						return this.rootState.ready.idle;
					}
				}
			}
		}),

		initialize: function () {
			this.originalLabel = this.$el.text();

			buttonHelpers.button(this.$el, "dummy");

			_.bindAll(this, "progressCallback", "doneCallback",
				"failCallback");

			this.hsm = new this.HSM({
				view: this
			});

			this.hsm.changeState(this.hsm.rootState.ready.idle);
		},

		progressCallback: function (type) {
			// type is either "load" or "play"
			this.hsm[type]();
		},

		doneCallback: function () {
			this.hsm.stop();
		},

		failCallback: function (reason, response) {
			var errorDescription;

			if (reason === "request") {
				if (response.status === 0)
					errorDescription = "Network error - the host is unreachable or returning an incorrect response";
				else
					errorDescription = "Error " + response.status + " - " + response.statusText;
			} else if (reason === "decode") {
				errorDescription = "The sound could not be decoded";
			}

			this.lastErrorDescription = this.soundErrorTemplate({
				error: errorDescription
			});

			this.hsm.error();
		},

		setIconAndLabel: function (newIcon, label) {
			this.withOptions(function (options) {
				options.setIcon("sprite-buttons-" + newIcon);
			});

			this.$el.prop("title", label || this.originalLabel);
		},

		playSoundAttributes: function () {
			var deferred = new $.Deferred();

			deferred.progress(this.progressCallback);
			deferred.done(this.doneCallback);
			deferred.fail(this.failCallback);

			this.eventBus.trigger("playSoundAttributes", {
				deferred: deferred,
				soundAttributes: this.model.attributes
			});
		},

		events: {
			"click": function (event) {
				this.hsm.play();
			}
		}
	});

	return SoundButtonView;
});

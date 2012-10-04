define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    soundError = require("text!templates/soundBrowser/soundError.txt")

	var SoundButtonView = BaseView.extend({
		soundErrorTemplate: _.template(soundError.trim()),

		initialize: function () {
			this.originalLabel = this.$el.text();

			this.$el.button({
				text: false
			});

			this.setIconAndLabel("play");

			_.bindAll(this, "progressCallback", "alwaysCallback",
				"doneCallback", "failCallback");
		},

		progressCallback: function (type) {
			this.$el.addClass("sound-button-view-loading");

			this.setIconAndLabel(type);
		},

		alwaysCallback: function () {
			this.$el.removeClass("sound-button-view-loading");

			this.$el.button("enable");
		},

		doneCallback: function () {
			this.setIconAndLabel("play");
		},

		failCallback: function (reason, response) {
			var errorDescription;

			if (reason === "request") {
				if (response.status === 0)
					errorDescription = "Network error - the host is unreachable or returning an incorrect response";
				else
					errorDescription = "Error " + response.status + " - " + response.statusText;
			} else if (reason === "decode") {
				errorDescription = "The sound could not be decoded"
			}

			this.setIconAndLabel("error", this.soundErrorTemplate({
				error: errorDescription
			}));
		},

		setIconAndLabel: function (newIcon, label) {
			this.$el.button("option", "icons", {
				primary: "sprite-buttons-" + newIcon
			});

			this.$el.prop("title", label || this.originalLabel);
		},

		createDeferred: function () {
			var deferred = new $.Deferred();

			deferred.progress(this.progressCallback);
			deferred.done(this.doneCallback);
			deferred.fail(this.failCallback);
			deferred.always(this.alwaysCallback);

			return deferred;
		},

		events: {
			"click": function (event) {
				this.$el.button("disable");

				event.preventDefault();

				this.eventBus.trigger("playSoundAttributes", {
					deferred: this.createDeferred(),
					soundAttributes: this.model.attributes
				});

				return false;
			}
		}
	});

	return SoundButtonView;
});

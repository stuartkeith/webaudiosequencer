define(function (require) {
	var $ = require("jquery"),
	    BaseView = require("baseView"),
	    buttonHelpers = require("utilities/buttonHelpers"),
	    settings = require("settings");

	var SequenceProgressView = BaseView.extend({
		initialize: function () {
			this.progressElements = [];
			this.progressIndex = null;
		},

		events: {
			"click button": function (event) {
				var progressIndex = $(event.currentTarget).data('progressIndex');

				this.eventBus.trigger("setPlaybackPosition", {
					playbackPosition: progressIndex
				});
			}
		},

		modelEvents: {
			"update": function (position) {
				this.setProgressIndex(position);
			}
		},

		render: function () {
			this.setLength(this.model.getLength());

			this.setProgressIndex(this.model.position);

			return this;
		},

		getButtonLabel: function (index) {
			var quarterNote = Math.floor(index / 4) + 1;
			var sixteenthNote = (index % 4) + 1;

			return quarterNote + "." + sixteenthNote;
		},

		setLength: function (length) {
			var existingLength = this.progressElements.length;
			var progressElement;

			if (length > existingLength) {
				// add progressElements
				for (var i = existingLength; i < length; i++) {
					progressElement = $("<button>" + this.getButtonLabel(i) + "</button>");
					progressElement.data("progressIndex", i);
					progressElement.outerWidth(settings.gridWidth);

					this.$el.append(progressElement);

					this.progressElements.push(progressElement);
				}
			} else if (length < existingLength) {
				// remove progressElements
				for (var i = existingLength - 1; i >= length; i--) {
					this.progressElements[i].remove();
				}

				this.progressElements.length = length;
			}

			this.$el.width(length * settings.gridWidth);

			buttonHelpers.buttonset(this.$el);
		},

		addActiveClass: function () {
			$(this.progressElements[this.progressIndex]).data("options").setActivated(true);
		},

		removeActiveClass: function () {
			if (this.progressIndex !== null) {
				var progressElement = this.progressElements[this.progressIndex];

				if (progressElement)
					$(progressElement).data("options").setActivated(false);
			}
		},

		setProgressIndex: function (index) {
			if (index !== this.progressIndex) {
				this.removeActiveClass();

				this.progressIndex = index;

				this.addActiveClass();
			}
		}
	});

	return SequenceProgressView;
});

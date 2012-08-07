define(function (require) {
	var BaseView = require("baseView"),
	    settings = require("settings");

	var SequenceProgressView = BaseView.extend({
		activeClassName: "ui-state-active",

		initialize: function () {
			this.progressElements = [];
			this.progressIndex = null;
		},

		events: {
			"click button": function (event) {
				var progressIndex = $(event.currentTarget).data('progressIndex');

				this.eventBus.trigger("setSequencePosition", {
					progressIndex: progressIndex
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
					progressElement.width(settings.gridWidth);

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

			this.$el.buttonset();
		},

		addActiveClass: function () {
			this.progressElements[this.progressIndex].addClass(this.activeClassName);
		},

		removeActiveClass: function () {
			if (this.progressIndex !== null) {
				var progressElement = this.progressElements[this.progressIndex];

				if (progressElement)
					progressElement.removeClass(this.activeClassName);
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

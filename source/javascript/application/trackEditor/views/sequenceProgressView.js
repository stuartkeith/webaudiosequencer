define([
	"baseView",
	"settings"
], function (BaseView, settings) {
	var SequenceProgressView = BaseView.extend({
		activeClassName: "active",

		initialize: function () {
			this.progressElements = [];
			this.progressIndex = null;
		},

		events: {
			"click .progress": function (event) {
				var progressIndex = $(event.target).data('progressIndex');

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

		setLength: function (length) {
			var existingLength = this.progressElements.length;
			var progressElement;

			if (length > existingLength) {
				// add progressElements
				for (var i = existingLength; i < length; i++) {
					progressElement = $("<div class='progress'></div>");
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

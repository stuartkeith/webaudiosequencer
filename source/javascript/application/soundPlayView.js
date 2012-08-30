define([
	"jquery",
	"underscore",
	"backbone",
	"baseView"
], function($, _, Backbone, BaseView) {
	var SoundButtonView = BaseView.extend({
		initialize: function () {
			this.$el.button({
				text: false
			});

			this.setIcon("play");
		},

		setIcon: function (newIcon) {
			this.$el.button("option", "icons", {
				primary: "sprite-buttons-" + newIcon
			});
		},

		events: {
			"click": function (event) {
				this.$el.button("disable");

				event.preventDefault();

				var that = this;
				var deferred = new $.Deferred();

				deferred.progress(function (type) {
					that.$el.addClass("sound-play-view-loading");

					that.setIcon(type);
				});

				deferred.always(function () {
					that.$el.removeClass("sound-play-view-loading");

					that.$el.button("enable");
				});

				deferred.done(function () {
					that.setIcon("play");
				});

				deferred.fail(function () {
					that.setIcon("error");
				});

				this.eventBus.trigger("playSoundAttributes", {
					deferred: deferred,
					soundAttributes: this.model.attributes
				});

				return false;
			}
		}
	});

	return SoundButtonView;
});

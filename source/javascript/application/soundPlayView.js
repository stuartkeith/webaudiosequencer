define([
	"jquery",
	"use!underscore",
	"use!backbone",
	"baseView"
], function($, _, Backbone, BaseView) {
	var SoundButtonView = BaseView.extend({
		initialize: function () {
			this.setClass("play");
		},

		setClass: function (newClass) {
			if (this.currentClass)
				this.$el.removeClass(this.currentClass);

			this.currentClass = "sprite-buttons-" + newClass;

			this.$el.addClass(this.currentClass);
		},

		events: {
			"click": function (event) {
				if (this.playIsDisabled)
					return;

				this.playIsDisabled = true;

				event.preventDefault();

				var that = this;
				var deferred = new $.Deferred();

				deferred.progress(function (type) {
					that.$el.css("cursor", "wait");
					that.setClass(type);
				});

				deferred.always(function () {
					that.$el.css("cursor", "");
					that.playIsDisabled = false;
				});

				deferred.done(function () {
					that.setClass("play");
				});

				deferred.fail(function () {
					that.setClass("error");
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

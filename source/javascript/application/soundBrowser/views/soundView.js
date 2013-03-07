define(function (require) {
	var _ = require("underscore"),
	    $ = require("jquery"),
	    BaseView = require("baseView"),
	    buttonHelpers = require("utilities/buttonHelpers"),
	    globalClickListener = require("utilities/globalClickListener"),
	    dragDropMixIn = require("dragDropMixIn"),
	    generateHSM = require("utilities/generateHSM");
	    SoundButtonView = require("application/soundButtonView"),
	    soundTemplateString = require("text!templates/soundBrowser/sound.html");

	var SoundView = BaseView.extend({
		className: "sound",
		tagName: "td",
		dragSource: "SoundExtended",
		dragEffect: "copy",

		soundTemplate: _.template(soundTemplateString),

		HSM: generateHSM(["focus", "unfocus", "select", "end"], {
			idle: {
				select: function () {
					var deferred = this.deferred = new $.Deferred();

					deferred.always(this.end);

					globalClickListener(this.view.$el, function () {
						deferred.reject();
					});

					this.view.eventBus.trigger("selectSound", {
						deferred: deferred,
						sound: this.view.model.attributes
					});

					return this.rootState.active;
				},

				focus: function () {
					this.view.eventBus.trigger("enterSound");

					return this.rootState.idle.hover;
				},

				unfocus: function () {
					this.view.eventBus.trigger("leaveSound");

					return this.rootState.idle;
				},

				hover: {
					enter: function () {
						this.view.$el.addClass("drag-hinted");
					},

					exit: function () {
						this.view.$el.removeClass("drag-hinted");
					}
				}
			},

			active: {
				enter: function () {
					this.view.$el.addClass("drag-active");
				},

				exit: function () {
					this.view.$el.removeClass("drag-active");
				},

				end: function () {
					this.deferred.reject();

					this.deferred = null;

					return this.rootState.idle;
				}
			}
		}),

		initialize: function () {
			this.$el.attr("draggable", true);

			this.hsm = new this.HSM({ view: this });
			this.hsm.changeState(this.hsm.rootState.idle);

			_.bindAll(this.hsm, "end");
		},

		events: {
			mouseenter: function (event) {
				this.hsm.focus();
			},

			mouseleave: function (event) {
				this.hsm.unfocus();
			},

			dragstart: function (event) {
				this.hsm.select();
			},

			dragend: function (event) {
				this.hsm.end();
			},

			click: function (event) {
				this.hsm.select();
			},

			"click .add": function (event) {
				this.eventBus.trigger("requestTrack", {
					pageX: event.pageX,
					pageY: event.pageY,
					soundModel: this.model
				});
			}
		},

		render: function () {
			this.$el.html(this.soundTemplate(this.model.toJSON()));

			buttonHelpers.button(this.$(".add:first"), "sprite-buttons-add");

			this.addChildView(SoundButtonView, {
				el: this.$(".sound-button:first"),
				model: this.model
			});

			return this;
		}
	});

	_.extend(SoundView.prototype, dragDropMixIn(BaseView));

	return SoundView;
});

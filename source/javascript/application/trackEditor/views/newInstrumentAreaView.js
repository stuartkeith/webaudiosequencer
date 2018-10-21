define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    dragDropMixIn = require("dragDropMixIn"),
	    settings = require("settings"),
	    generateHSM = require("utilities/generateHSM");

	var NewInstrumentAreaView = BaseView.extend({
		dragTarget: "SoundExtended",
		dropEffect: "copy",

		HSM: generateHSM(["hint", "unhint", "activate", "deactivate", "over", "leave", "select"], {
			hidden: {},

			activate: function (args) {
				this.deferred = args.deferred;
				this.sound = args.sound;

				this.deferred.always(_.bind(this.deactivate, this));

				this.view.activations++;

				return this.rootState.activated;
			},

			deactivate: function () {
				this.view.activations--;

				if (this.view.activations === 0) {
					this.deferred = null;
					this.sound = null;

					return this.rootState.idle;
				}
			},

			idle: {
				hint: function () {
					return this.rootState.idle.hinted;
				},

				hinted: {
					enter: function () {
						this.view.$el.addClass("drag-hinted");
					},

					exit: function () {
						this.view.$el.removeClass("drag-hinted");
					},

					unhint: function () {
						return this.rootState.idle;
					}
				}
			},

			activated: {
				enter: function () {
					this.view.$el.addClass("drag-active");
				},

				exit: function () {
					this.view.$el.removeClass("drag-active");
				},

				over: function () {
					return this.rootState.activated.hover;
				},

				select: function () {
					this.view.addInstrument(this.sound);

					this.deferred.resolve();
				},

				hover: {
					enter: function () {
						this.view.$el.addClass("drag-over");
					},

					exit: function () {
						this.view.$el.removeClass("drag-over");
					},

					leave: function () {
						return this.rootState.activated;
					}
				}
			}
		}),

		initialize: function () {
			this.activations = 0;

			this.hsm = new this.HSM({ view: this });
			this.hsm.changeState(this.hsm.rootState.idle);
		},

		events: {
			"mouseenter": function (event) {
				this.hsm.over();
			},

			"mouseleave": function (event) {
				this.hsm.leave();
			},

			"dragenter": function (model, event) {
				this.hsm.over();
			},

			"dragleave": function (model, event) {
				this.hsm.leave();
			},

			"drop": function (model, event) {
				this.hsm.select();
			},

			"click": function () {
				this.hsm.select();
			}
		},

		eventBusEvents: {
			"selectSound": function (args) {
				this.hsm.activate(args);
			},

			"enterSound": function () {
				this.hsm.hint();
			},

			"leaveSound": function () {
				this.hsm.unhint();
			}
		},

		modelEvents: {
			"instrumentAdded": "render",
			"instrumentRemoved": "render"
		},

		addInstrument: function (soundAttributes) {
			this.eventBus.trigger("addInstrument", {
				instrumentManager: this.model,
				soundAttributes: soundAttributes
			});
		},

		render: function () {
			if (this.model.instrumentRangeRemaining === 0) {
				this.$el.hide();

				this.hsm.changeState(this.hsm.rootState.hidden);
			} else {
				this.$el.show();

				this.hsm.changeState(this.hsm.rootState.idle);
			}
		}
	});

	_.extend(NewInstrumentAreaView.prototype, dragDropMixIn(BaseView));

	return NewInstrumentAreaView;
});

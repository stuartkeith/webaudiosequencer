define(function (require) {
	_ = require("underscore"),
	BaseView = require("baseView"),
	settings = require("settings"),
	dragDropMixIn = require("dragDropMixIn"),
	VolumeView = require("application/volumeView"),
	instrumentTemplateString = require("text!templates/trackEditor/instrument.html"),
	generateHSM = require("utilities/generateHSM");

	var InstrumentView = BaseView.extend({
		className: "instrument drag-target",
		instrumentTemplate: _.template(instrumentTemplateString),

		dragTarget: "SoundExtended",
		dropEffect: "copy",

		StateHSM: generateHSM(["ready", "loading", "error"], {
			enabled: {
				loading: function () {
					return this.rootState.isLoading;
				},

				showError: {
					enter: function () {
						this.view.$el.addClass("instrument-state-error");

						// TODO - handle this.view.model.error
					},

					exit: function () {
						this.view.$el.removeClass("instrument-state-error");
					}
				}
			},

			isLoading: {
				enter: function () {
					this.view.$el.addClass("instrument-state-loading");
				},

				exit: function () {
					this.view.$el.removeClass("instrument-state-loading");
				},

				ready: function () {
					return this.rootState.enabled;
				},

				error: function () {
					return this.rootState.enabled.showError;
				}
			}
		}),

		HSM: generateHSM(["hint", "unhint", "activate", "deactivate", "over", "leave", "select"], {
			idle: {
				hint: function () {
					return this.rootState.idle.hinting;
				},

				activate: function (args) {
					this.sound = args.sound;

					this.deferred = args.deferred;
					this.deferred.always(_.bind(this.deactivate, this));

					return this.rootState.activated;
				},

				hinting: {
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

				deactivate: function () {
					this.deferred = null;

					return this.rootState.idle;
				},

				over: function () {
					return this.rootState.activated.hover;
				},

				select: function () {
					this.view.eventBus.trigger("updateInstrument", {
						instrument: this.view.model,
						soundAttributes: this.sound
					});

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
			this.hsm = new this.HSM({ view: this });
			this.hsm.changeState(this.hsm.rootState.idle);

			this.stateHSM = new this.StateHSM({ view: this });
			this.stateHSM.changeState(this.stateHSM.rootState.enabled);
		},

		events: {
			"dragenter": function () {
				this.hsm.over();
			},

			"dragleave": function () {
				this.hsm.leave();
			},

			"drop": function (model, event) {
				this.hsm.select();
			},

			"mouseenter": function () {
				this.hsm.over();
			},

			"mouseleave": function () {
				this.hsm.leave();
			},

			"click": function () {
				this.hsm.select();
			},

			"click .remove-instrument": function (event) {
				this.trigger("removeInstrument", this.model);
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
			"change": "modelChange",
			"error": "modelError",
			"remove": "remove"
		},

		modelChange: function () {
			if (this.model.soundAttributes)
				this.instrumentTitle.text(this.model.soundAttributes.title);

			this.$el.height((this.model.range * settings.instrumentHeight) - this.heightDifference);

			this.stateHSM[this.model.state]();
		},

		modelError: function () {
			this.stateHSM.error();
		},

		render: function () {
			this.$el.html(this.instrumentTemplate());

			this.instrumentTitle = this.$(".instrument-title:first");

			this.heightDifference = this.$el.outerHeight(true) - this.$el.height();

			var volumeView = this.addChildView(VolumeView, {
				el: this.$(".instrument-volume:first"),
				model: this.model
			}).render();

			volumeView.on("change", this.volumeViewChange, this);

			this.$(".remove-instrument:first").button({
				icons: {
					primary: "sprite-buttons-remove"
				},

				text: false
			});

			this.modelChange();

			return this;
		},

		volumeViewChange: function (value) {
			this.eventBus.trigger("setInstrumentVolume", {
				instrumentModel: this.model,
				volume: value
			});
		}
	});

	_.extend(InstrumentView.prototype, dragDropMixIn(BaseView));

	return InstrumentView;
});

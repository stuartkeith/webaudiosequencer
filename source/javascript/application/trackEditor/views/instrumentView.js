define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"settings",
	"dragDropMixIn",
	"application/volumeView",
	"text!templates/trackEditor/instrument.html"
], function(_, Backbone, BaseView, settings, dragDropMixIn, VolumeView, instrumentTemplateString) {
	var InstrumentView = BaseView.extend({
		className: "instrument drag-target",
		instrumentTemplate: _.template(instrumentTemplateString),

		dragTarget: "SoundExtended",
		dropEffect: "copy",

		initialize: function () {
		},

		events: {
			"dragenter": function (model, event) {
				this.$el.addClass("drag-over");
			},

			"dragleave": function (model, event) {
				this.$el.removeClass("drag-over");
			},

			"drop": function (model, event) {
				this.$el.removeClass("drag-over");

				this.eventBus.trigger("updateInstrument", {
					instrument: this.model,
					soundAttributes: model
				});
			},

			"click .remove-instrument": function (event) {
				this.trigger("removeInstrument", this.model);
			}
		},

		eventBusEvents: {
			"overSoundExtended": function () {
				this.$el.addClass("drag-available");
			},

			"outSoundExtended": function () {
				this.$el.removeClass("drag-available");
			}
		},

		modelEvents: {
			"changed": function () {
				this.render();
			},

			"remove": function () {
				this.remove();
			}
		},

		render: function () {
			this.$el.html(this.instrumentTemplate(this.model));

			var volumeView = this.addChildView(VolumeView, {
				el: this.$el.find(".instrument-volume:first"),
				model: this.model
			}).render();

			volumeView.on("change", this.volumeViewChange, this);

			this.$el.toggleClass("is-loading", this.model.isLoading);

			this.$el.height(this.model.range * settings.instrumentHeight);

			return this;
		},

		volumeViewChange: function (event) {
			this.eventBus.trigger("setInstrumentVolume", {
				instrumentModel: this.model,
				volume: event.target.value
			});
		}
	});

	_.extend(InstrumentView.prototype, dragDropMixIn(BaseView));

	return InstrumentView;
});

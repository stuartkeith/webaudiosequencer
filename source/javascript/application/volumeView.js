define([
	"use!underscore",
	"use!backbone",
	"baseView"
], function(_, Backbone, BaseView) {
	var VolumeView = BaseView.extend({
		events: {
			"change": function (event) {
				this.trigger("change", event.target.value);
			}
		},

		modelEvents: {
			"volume": "updateValue"
		},

		render: function () {
			this.el.min = 0;
			this.el.max = 1;
			this.el.step = 0.01;

			this.updateValue();

			return this;
		},

		updateValue: function () {
			this.el.value = this.model.getVolume();
		}
	});

	return VolumeView;
});

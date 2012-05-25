define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/instructions/instructions.html"
], function(_, Backbone, BaseView, instructionsString) {
	var InstructionsPanelView = BaseView.extend({
		render: function () {
			this.$el.html(instructionsString);

			return this;
		}
	});

	return InstructionsPanelView;
});

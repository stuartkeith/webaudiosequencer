define([
	"underscore",
	"backbone",
	"baseView",
	"text!templates/instructions/instructions.html"
], function(_, Backbone, BaseView, instructionsString) {
	var InstructionsPanelView = BaseView.extend({
		id: "instructions-panel",

		render: function () {
			this.$el.html(instructionsString);

			return this;
		}
	});

	return InstructionsPanelView;
});

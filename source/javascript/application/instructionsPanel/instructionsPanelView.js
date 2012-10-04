define(function (require) {
	var BaseView = require("baseView"),
	    instructionsString = require("text!templates/instructions/instructions.html");

	var InstructionsPanelView = BaseView.extend({
		id: "instructions-panel",

		render: function () {
			this.$el.html(instructionsString);

			return this;
		}
	});

	return InstructionsPanelView;
});

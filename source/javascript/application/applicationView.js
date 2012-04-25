define([
	"use!underscore",
	"use!backbone",
	"text!templates/application.html"
], function(_, Backbone, applicationTemplateString) {
	var applicationTemplate = _.template(applicationTemplateString);

	var ApplicationView = Backbone.View.extend({
		render: function () {
			this.$el.html(applicationTemplate());

			return this;
		}
	});

	return ApplicationView;
});

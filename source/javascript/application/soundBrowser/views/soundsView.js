define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./soundView"
], function(_, Backbone, BaseView, SoundView) {
	var SoundsView = BaseView.extend({
		className: "sounds",

		render: function (collection) {
			this.removeAllChildViews();

			if (collection) {
				var view;

				collection.each(function (model, counter) {
					view = this.addChildView(SoundView, { model: model });

					this.$el.append(view.render().$el);
				}, this);
			}

			return this;
		}
	});

	return SoundsView;
});

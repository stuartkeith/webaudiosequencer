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
				var totalWidth = 0;
				var view;

				collection.each(function (model, counter) {
					view = this.addChildView(SoundView, { model: model });

					this.$el.append(view.render().$el);

					totalWidth += view.$el.outerWidth(true);
				}, this);

				this.$el.width(totalWidth);
			}

			return this;
		}
	});

	return SoundsView;
});

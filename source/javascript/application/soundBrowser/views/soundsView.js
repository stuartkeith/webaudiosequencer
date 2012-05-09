define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./soundView"
], function(_, Backbone, BaseView, SoundView) {
	var SoundsView = BaseView.extend({
		className: "sounds",

		initialize: function (options) {
			// check the width of a child view to set the width
			// of the element.

			var view, viewWidth;

			view = this.addChildView(SoundView);
			this.$el.append(view.render().$el);

			viewWidth = view.$el.outerWidth(true);

			this.removeChildView(view);

			this.$el.width(viewWidth * options.limit);
		},

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

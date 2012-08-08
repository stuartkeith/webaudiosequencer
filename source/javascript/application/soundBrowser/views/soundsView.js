define([
	"underscore",
	"backbone",
	"baseView",
	"./soundView"
], function(_, Backbone, BaseView, SoundView) {
	var SoundsView = BaseView.extend({
		className: "sounds",

		initialize: function (options) {
			var view;

			view = this.addChildView(SoundView);
			this.$el.append(view.$el);
			view.render();

			this.removeChildView(view);
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

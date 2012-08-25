define([
	"underscore",
	"backbone",
	"baseView",
	"./soundView"
], function(_, Backbone, BaseView, SoundView) {
	var SoundsView = BaseView.extend({
		initialize: function (options) {
			this.columns = 7;
			this.rows = 4;

			this.table = $("<table></table>");
		},

		render: function (collection) {
			var column, row, rowElement, view, i = 0;

			this.removeAllChildViews();
			this.table.detach();
			this.table.empty();

			var collectionIterator = _.bind(function () {
				var model = collection && collection.models[i];

				if (model) {
					view = this.addChildView(SoundView, { model: model });

					i++;

					return view.render().$el;
				} else {
					return $("<td class='empty-sound'></td>");
				}
			}, this);

			for (row = 0; row < this.rows; row++) {
				rowElement = $("<tr></tr>");

				this.table.append(rowElement);

				for (column = 0; column < this.columns; column++) {
					rowElement.append(collectionIterator());
				}
			}

			this.$el.append(this.table);

			return this;
		}
	});

	return SoundsView;
});

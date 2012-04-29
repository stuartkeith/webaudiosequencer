define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"utilities/canvasGrid",
	"templates/loopEditor/gridView/canvasGridConfiguration"
], function(_, Backbone, BaseView, CanvasGrid, canvasGridConfiguration) {
	var GridView = BaseView.extend({
		className: "grid-view",

		initialize: function () {
			this.canvasGrid = new CanvasGrid(this.el);

			this.canvasGrid.setColumns(16);
			this.canvasGrid.setRows(8);
			this.canvasGrid.setColumnWidth(32);
			this.canvasGrid.setRowHeight(16);
			this.canvasGrid.setSubCanvasses(canvasGridConfiguration.subCanvasses);
			this.canvasGrid.setCanvasSelector(canvasGridConfiguration.canvasSelector);
		},

		render: function () {
			this.canvasGrid.drawGrid();

			return this;
		}
	});

	return GridView;
});

define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"utilities/canvasGrid",
	"templates/trackEditor/gridView/canvasGridConfiguration"
], function(_, Backbone, BaseView, CanvasGrid, canvasGridConfiguration) {
	var GridView = BaseView.extend({
		className: "grid-view",

		initialize: function () {
			this.canvasGrid = new CanvasGrid(this.el);

			this.canvasGrid.setColumns(this.model.length);
			this.canvasGrid.setRows(8);
			this.canvasGrid.setColumnWidth(32);
			this.canvasGrid.setRowHeight(16);
			this.canvasGrid.setSubCanvasses(canvasGridConfiguration.subCanvasses);
			this.canvasGrid.setCanvasSelector(canvasGridConfiguration.canvasSelector);
		},

		modelEvents: {
			"note:added": function (location) {
				this.canvasGrid.drawCanvasAt(location.x, location.y, this.canvasGrid.subCanvasses.note);
			},

			"note:removed": function (location) {
				this.canvasGrid.drawCanvasAt(location.x, location.y);
			}
		},

		events: {
			"mousedown": function (event) {
				if (event.button === 0) {
					var location = this.canvasGrid.mouseEventToColumnAndRow(this.$el, event);
					this.isMouseDown = true;
					this.isAddingNotes = this.model.toggleNoteAt(location, true);

					event.preventDefault();

					return false
				}
			},

			"mousemove": function (event) {
				var location = this.canvasGrid.mouseEventToColumnAndRow(this.$el, event);

				if (!this.previousLocation || (location.x !== this.previousLocation.x || location.y !== this.previousLocation.y)) {
					this.previousLocation = location;

					if (this.isMouseDown) {
						if (this.isAddingNotes)
							this.model.addNoteAt(location, true);
						else
							this.model.removeNoteAt(location);
					}
				}
			},

			"mouseleave": function (event) {
				this.isMouseDown = false;
			},

			"mouseup": function (event) {
				if (event.button === 0) {
					this.isMouseDown = false;
				}
			}
		},

		render: function () {
			this.canvasGrid.drawGrid();

			return this;
		}
	});

	return GridView;
});

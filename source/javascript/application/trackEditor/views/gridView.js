define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"settings",
	"utilities/canvasGrid",
	"templates/trackEditor/gridView/canvasGridConfiguration"
], function(_, Backbone, BaseView, settings, CanvasGrid, canvasGridConfiguration) {
	var GridView = BaseView.extend({
		className: "grid-view",

		initialize: function () {
			this.canvasGrid = new CanvasGrid(this.el);

			this.canvasGrid.setRows(settings.maxNotes);
			this.canvasGrid.setColumnWidth(settings.gridWidth);
			this.canvasGrid.setRowHeight(settings.instrumentHeight);
			this.canvasGrid.setSubCanvasses(canvasGridConfiguration.subCanvasses);
			this.canvasGrid.setCanvasSelector(canvasGridConfiguration.canvasSelector);
		},

		modelEvents: {
			"note:added": function (location) {
				this.drawNoteAt(location.x, location.y);
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
					this.mouseDownRow = location.y;

					event.preventDefault();

					return false
				}
			},

			"mousemove": function (event) {
				var location = this.canvasGrid.mouseEventToColumnAndRow(this.$el, event);
				location.y = this.mouseDownRow;

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

		drawNoteAt: function (x, y) {
			this.canvasGrid.drawCanvasAt(x, y, this.canvasGrid.subCanvasses.note);
		},

		render: function () {
			this.canvasGrid.setColumns(this.model.getLength());
			this.canvasGrid.drawGrid(true);

			this.model.notes.each(function (x, y, value) {
				this.drawNoteAt(x, y);
			}, this);

			return this;
		}
	});

	return GridView;
});

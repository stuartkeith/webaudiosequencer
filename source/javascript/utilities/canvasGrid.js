define(function (require) {
	var _ = require("underscore");

	var CanvasGrid = function (canvas) {
		this._canvas = canvas;
		this._context = canvas.getContext('2d');
	};

	CanvasGrid.prototype.setSubCanvasses = function (canvasses) {
		if (this._canvasses !== canvasses) {
			this._canvasses = canvasses;
			this._redrawAll = true;
		}
	};

	CanvasGrid.prototype.setCanvasSelector = function (fn) {
		if (this._canvasSelector !== fn) {
			this._canvasSelector = fn;
			this._redrawAll = true;
		}
	};

	CanvasGrid.prototype.setColumns = function (value) {
		if (this.columns !== value) {
			this.columns = value;
			this._redrawCanvas = true;
		}
	};

	CanvasGrid.prototype.setRows = function (value) {
		if (this.rows !== value) {
			this.rows = value;
			this._redrawCanvas = true;
		}
	};

	CanvasGrid.prototype.setColumnWidth = function (value) {
		if (this.columnWidth !== value) {
			this.columnWidth = value;
			this._redrawAll = true;
		}
	};

	CanvasGrid.prototype.setRowHeight = function (value) {
		if (this.rowHeight !== value) {
			this.rowHeight = value;
			this._redrawAll = true;
		}
	};

	CanvasGrid.prototype.drawToCanvas = function (drawFunction) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');

		canvas.width = this.columnWidth;
		canvas.height = this.rowHeight;

		drawFunction(context, canvas.width, canvas.height);

		return canvas;
	};

	CanvasGrid.prototype.runSelector = function (x, y) {
		return this._canvasSelector(this.subCanvasses, x, y, this.columns, this.rows);
	};

	CanvasGrid.prototype.drawCanvasAt = function (x, y, canvas) {
		var canvas = canvas || this.runSelector(x, y);

		this._context.drawImage(canvas, x * this.columnWidth, y * this.rowHeight);
	};

	CanvasGrid.prototype.drawGrid = function (redrawCanvas) {
		if (this._redrawAll) {
			this.subCanvasses = {};

			// redraw the off-screen canvasses
			_.each(this._canvasses, function (fn, key) {
				this.subCanvasses[key] = this.drawToCanvas(fn);
			}, this);
		}

		if (redrawCanvas || this._redrawAll || this._redrawCanvas) {
			var subCanvas;

			this._canvas.width = this.columns * this.columnWidth;
			this._canvas.height = this.rows * this.rowHeight;

			var x = 0, xPixels = 0;
			var y, yPixels;

			while (x < this.columns) {
				y = yPixels = 0;

				while (y < this.rows) {
					subCanvas = this.runSelector(x, y);

					this._context.drawImage(subCanvas, xPixels, yPixels);

					y++;
					yPixels += this.rowHeight;
				}

				x++;
				xPixels += this.columnWidth;
			}
		}

		this._redrawAll = false;
		this._redrawCanvas = false;
	};

	CanvasGrid.prototype.pixelToColumn = function (pixel) {
		return Math.floor(pixel / this.columnWidth);
	};

	CanvasGrid.prototype.pixelToRow = function (pixel) {
		return Math.floor(pixel / this.rowHeight);
	};

	CanvasGrid.prototype.mouseEventToColumnAndRow = function ($el, event) {
		var offset = $el.offset();
		var offsetX = event.pageX - offset.left;
		var offsetY = event.pageY - offset.top;

		return {
			x: this.pixelToColumn(offsetX),
			y: this.pixelToRow(offsetY)
		};
	};

	return CanvasGrid;
});

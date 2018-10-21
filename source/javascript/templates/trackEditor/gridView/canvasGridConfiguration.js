define(function () {
	var squareFunctionFactory = function (fill, stroke) {
		var squareFunction = function (context, width, height) {
			context.fillStyle = stroke;
			context.fillRect(0, 0, width, height);
			context.fillStyle = fill;
			context.fillRect(0, 0, width - 1, height - 1);
		};

		return squareFunction;
	};

	return {
		subCanvasses: {
			off: squareFunctionFactory("#E3EFF8", "#C5C4CD"),
			on: squareFunctionFactory("#E9F4F7", "#C5C4CD"),
			note: function (context, width, height) {
				context.fillStyle = "#AE192B";
				context.fillRect(0, 0, width, height);
				context.fillStyle = "#FF3D5C";
				context.fillRect(1, 1, width - 2, height - 2);
			}
		},

		canvasSelector: function (subCanvasses, x, y, columns, rows) {
			return x % 4 ? subCanvasses.off : subCanvasses.on;
		}
	};
});

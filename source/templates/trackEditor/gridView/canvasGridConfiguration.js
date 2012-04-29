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
			off: squareFunctionFactory("#aaaaaa", "#777777"),
			on: squareFunctionFactory("#bbbbbb", "#888888"),
			note: function (context, width, height) {
				context.fillStyle = "#eeee88";
				context.fillRect(0, 0, width, height);
				context.fillStyle = "#ffffbb";
				context.fillRect(1, 1, width - 2, height - 2);
			}
		},

		canvasSelector: function (subCanvasses, x, y, columns, rows) {
			return x % 4 ? subCanvasses.off : subCanvasses.on;
		}
	};
});

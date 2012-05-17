define(function () {
	var functionChain = function (functions, context, args, success, failure, index) {
		var index = index || 0;

		if (index >= functions.length) {
			if (success)
				success.apply(context, args);
		} else {
			var fn = functions[index];

			if (fn.apply(context, args))
				functionChain(functions, context, args, success, failure, index + 1);
			else if (failure) {
				failure.apply(context, args);
			}
		}
	};

	return functionChain;
});

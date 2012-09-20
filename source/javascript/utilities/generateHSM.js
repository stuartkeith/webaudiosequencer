define(function (require) {
	var _ = require("underscore");

	// these properties will be ignored when finding substates
	var reserved = ["enter", "exit"];

	var emptyFunction = function () {
	};

	var callStateExits = function (oldState, newState, context) {
		// check if oldState is in the newState's chain
		var index = newState.chain.indexOf(oldState);

		// if it's not, we need to exit from this state.
		if (index === -1) {
			oldState.exit.call(context);

			// repeat with the old state's parent
			return callStateExits(_.last(oldState.chain), newState, context);
		} else {
			// if it is, it's the first state we have in common

			return index;
		}
	};

	var callStateEnters = function (newState, startIndex, context) {
		while (startIndex < newState.chain.length) {
			newState.chain[i].enter.call(context);

			startIndex++;
		}

		newState.enter.call(context);
	};

	var changeState = function (newState) {
		if (this.state === newState)
			return;

		var commonRootIndex = callStateExits(this.state, newState, this);

		callStateEnters(newState, commonRootIndex + 1, this);

		this.state = newState;
	};

	var process = function (events, state, stateName, chain, object) {
		var subState, subChain;

		state.name = stateName;
		state.chain = chain;
		state.enter = object.enter || emptyFunction;
		state.exit = object.exit || emptyFunction;

		// add event functions
		_.each(events, function (event) {
			state[event] = object[event] || (chain.length && _.last(chain)[event]) || emptyFunction;
		});

		// add sub states
		_.each(object, function (value, key) {
			if (events.indexOf(key) === -1 && reserved.indexOf(key) === -1) {
				subState = state[key] = {};

				subChain = chain.slice(); // shallow copy
				subChain.push(state);

				process(events, subState, key, subChain, value);
			}
		});
	};

	var generateHSM = function (events, object) {
		var HSM = function (properties) {
			this.state = this.rootState;

			_.extend(this, properties);
		};

		HSM.prototype.changeState = changeState;
		HSM.prototype.rootState = {};

		_.each(events, function (event) {
			HSM.prototype[event] = function () {
				var newState = this.state[event].apply(this, arguments);

				if (newState)
					this.changeState(newState);
			};
		});

		process(events, HSM.prototype.rootState, "rootState", [], object);

		return HSM;
	};

	return generateHSM;
});

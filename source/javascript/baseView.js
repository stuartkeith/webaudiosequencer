define(function (require) {
	var $ = require("jquery"),
	    _ = require("underscore"),
	    Backbone = require("backbone");

	var getProperty = function (obj, property) {
		if (_.isFunction(property))
			return property;
		else if (_.isString(property))
			return obj[property];
	};

	var ExtendedView = function (options) {
		this.childViews = [];
		this.eventBus = options.eventBus;
		this.eventBusEvents = options.eventBusEvents || this.eventBusEvents;
		this.modelEvents = options.modelEvents || this.modelEvents;

		Backbone.View.apply(this, arguments);

		this.delegateModelEvents();
		this.delegateEventBusEvents();
	};

	_.extend(ExtendedView.prototype, Backbone.View.prototype, {
		delegateEventBusEvents: function () {
			if (this.eventBusEvents) {
				_.each(this.eventBusEvents, function (fn, event) {
					this.eventBus.on(event, getProperty(this, fn), this);
				}, this);
			}
		},

		undelegateEventBusEvents: function () {
			if (this.eventBusEvents) {
				_.each(this.eventBusEvents, function (fn, event) {
					this.eventBus.off(event, getProperty(this, fn), this);
				}, this);
			}
		},

		delegateModelEvents: function () {
			if (this.model && this.model.on && this.modelEvents) {
				_.each(this.modelEvents, function (fn, event) {
					this.model.on(event, getProperty(this, fn), this);
				}, this);
			}
		},

		undelegateModelEvents: function () {
			if (this.model && this.model.off && this.modelEvents) {
				_.each(this.modelEvents, function (fn, event) {
					this.model.off(event, getProperty(this, fn), this);
				}, this);
			}
		},

		setModel: function (model) {
			this.undelegateModelEvents();
			this.model = model;
			this.delegateModelEvents();
		},

		addChildView: function (childViewClass, options) {
			var options = _.extend(options || {}, { eventBus: this.eventBus });

			var childView = new childViewClass(options);

			this.childViews.push(childView);

			childView.on("remove", this._removeHandler, this);

			return childView;
		},

		_removeHandler: function (childView, completeFunction) {
			this.removeChildView(childView, completeFunction, childView);
		},

		removeChildView: function (childView, completeFunction, completeFunctionThis) {
			var parent = this;
			var index = this.childViews.indexOf(childView);

			this.childViews.splice(index, 1);

			childView.off("remove", this._removeHandler, this);

			childView._remove(function () {
				if (completeFunction)
					completeFunction.call(completeFunctionThis || parent);
			});
		},

		removeAllChildViews: function (completeFunction) {
			var numberOfChildren = this.childViews.length;

			if (numberOfChildren === 0) {
				if (completeFunction)
					completeFunction.call(this);
			} else {
				var view = this;
				var removedChildren = 0;
				var child, i;
				var childViewsClone = this.childViews.slice(0);
				this.childViews.length = 0;

				for (i = 0; i < numberOfChildren; i++) {
					child = childViewsClone[i];

					child.off("remove", this.removeHandler, view);

					child._remove(function () {
						removedChildren++;

						if (removedChildren === numberOfChildren && completeFunction)
							completeFunction.call(view);
					}, i);
				}
			}
		},

		remove: function () {
			this.trigger("remove", this);
		},

		_remove: function (completeFunction, index) {
			this.undelegateEvents();
			this.undelegateEventBusEvents();
			this.undelegateModelEvents();
			this.unbind();
			this.off();

			var preRemoveCallback = _.bind(function () {
				this._preRemove(completeFunction, index);
			}, this);

			if (this.preRemove)
				this.preRemove(preRemoveCallback, index);
			else
				preRemoveCallback();
		},

		_preRemove: function (completeFunction, index) {
			var postRemoveCallback = _.bind(function () {
				this._postRemove(completeFunction, index);
			}, this);

			this.removeAllChildViews(function () {
				if (this.postRemove)
					this.postRemove(postRemoveCallback, index);
				else
					postRemoveCallback();
			});
		},

		_postRemove: function (completeFunction, index) {
			this.$el.remove();

			if (completeFunction)
				completeFunction.call(this);
		}
	});

	ExtendedView.extend = Backbone.View.extend;

	if ("ontouchstart" in window) {
		var touchMoveCount = {},
		    pageX, pageY;

		var isOver = function (event, elementPosition) {
			if (event.pageX >= elementPosition.left && event.pageX < elementPosition.right)
				if (event.pageY >= elementPosition.top && event.pageY < elementPosition.bottom)
					return true;
		};

		var touchstartWrapper = function (originals, event) {
			var target = $(event.currentTarget);

			var offset = target.offset();
			offset.right = offset.left + target.outerWidth();
			offset.bottom = offset.top + target.outerHeight();

			$.data(event.currentTarget, "touch", {
				touchMoveCount: 0,
				elementPosition: offset
			});

			event.pageX = pageX = event.originalEvent.changedTouches[0].pageX;
			event.pageY = pageY = event.originalEvent.changedTouches[0].pageY;
			event.which = 0;

			originals[0] && originals[0].call(this, event);

			event.which = 1;

			originals[1] && originals[1].call(this, event);
		};

		var touchmoveWrapper = function (original, event) {
			var touchData = $.data(event.currentTarget, "touch");

			touchData.touchMoveCount++;

			event.pageX = pageX = event.originalEvent.changedTouches[0].pageX;
			event.pageY = pageY = event.originalEvent.changedTouches[0].pageY;
			event.which = 1;

			if (original && isOver(event, touchData.elementPosition))
				original.call(this, event);
		};

		var touchendWrapper = function (originals, event) {
			event.pageX = pageX;
			event.pageY = pageY;
			event.which = 1;

			var touchData = $.data(event.currentTarget, "touch");

			if (originals[0] || originals[1]) {
				if (isOver(event, touchData.elementPosition)) {
					originals[0] && originals[0].call(this, event);

					event.which = 0;

					originals[1] && originals[1].call(this, event);
				}
			}

			event.which = 1;

			if (originals[2] && touchData.touchMoveCount < 9)
				originals[2].call(this, event);
		};

		var mouseEvents = ["mousedown", "mousemove", "mouseup", "click", "mouseenter", "mouseleave"];

		ExtendedView.extend = function (protoProps, classProps) {
			/*
			Get the mouse events (specified above in mouseEvents) from the
			prototype's properties (protoProps), and map them to the touch
			events wrapped functions instead.
			 */

			var events = protoProps.events;
			var extractedMouseEvents = {};
			var match;

			/*
			extractedMouseEvents[target][event] = "fullEventName"
			extractedMouseEvents[".foo"]["click"] = "click .foo";
			 */
			for (var event in events) {
				// match[1] is event name
				// match[2] is target (may be empty string)
				match = event.match(/^(\S+)\s*(.*)$/);

				if (mouseEvents.indexOf(match[1]) === -1)
					continue;

				(extractedMouseEvents[match[2]] || (extractedMouseEvents[match[2]] = {}))[match[1]] = match[0];
			}

			/*
			addTargetToEventName("touchmove", ".blah") === "touchmove .blah"
			addTargetToEventName("touchend") === "touchend"
			 */
			var addTargetToEventName = function (event, target) {
				return event + (target ? (" " + target) : "");
			};

			var mouseFunctions = {}, originalEventFunctionOrString;

			// iterate through each target.
			_.each(extractedMouseEvents, function (extractedMouseEvents, target) {
				_.each(mouseEvents, function (mouseEvent) {
					originalEventFunctionOrString = extractedMouseEvents[mouseEvent];

					mouseFunctions[mouseEvent] = getProperty(protoProps, events[originalEventFunctionOrString]);

					delete events[originalEventFunctionOrString];
				});

				events[addTargetToEventName("touchstart", target)] = _.wrap([mouseFunctions["mouseenter"], mouseFunctions["mousedown"]], touchstartWrapper);
				events[addTargetToEventName("touchmove", target)] = _.wrap(mouseFunctions["mousemove"], touchmoveWrapper);
				events[addTargetToEventName("touchend", target)] = _.wrap([mouseFunctions["mouseup"], mouseFunctions["mouseleave"], mouseFunctions["click"]], touchendWrapper);
			});

			return Backbone.View.extend.call(this, protoProps, classProps);
		};
	}

	return ExtendedView;
});

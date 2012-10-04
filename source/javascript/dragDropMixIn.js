define(function (require) {
	var _ = require("underscore");

	// the model currently being dragged.
	var draggedData = { dragSource: null, model: null };

	var replaceDragSourceEvents = function (newEvents) {
		var _dragstart = newEvents.dragstart;
		var _dragend = newEvents.dragend;

		newEvents.dragstart = function (event) {
			draggedData.dragSource = this.dragSource;
			draggedData.model = this.model;

			var dataTransfer = event.originalEvent.dataTransfer;
			// required for Chrome on Mac as of 17/05/12.
			dataTransfer.setData("text/html", "dummy");

			if (this.dragEffect)
				dataTransfer.effectAllowed = this.dragEffect;

			if (_dragstart)
				_dragstart.call(this, event);
		};

		newEvents.dragend = function (event) {
			if (_dragend)
				_dragend.call(this, event);

			draggedData.dragSource = null;
			draggedData.model = null;
		};
	};

	var replaceDragTargetEvents = function (events) {
		var _dragover = events.dragover;

		events.dragover = function (event) {
			if (draggedData.dragSource === this.dragTarget) {
				event.preventDefault();

				if (this.dropEffect)
					event.originalEvent.dataTransfer.dropEffect = this.dropEffect;

				if (_dragover)
					_dragover.call(this, draggedData.model, event);

				return false;
			}
		};

		var dragEnterDepth = 0;

		var _drop = events.drop;

		events.drop = function (event) {
			dragEnterDepth = 0;

			event.preventDefault();
			event.stopPropagation();

			if (_drop)
				_drop.call(this, draggedData.model, event);

			return false;
		};

		var _drag = events.drag;

		if (_drag) {
			events.drag = function (event) {
				if (draggedData.dragSource === this.dragTarget)
					_drag.call(this, draggedData.model, event);
			};
		}

		var _dragenter = events.dragenter;

		if (_dragenter) {
			events.dragenter = function (event) {
				if (draggedData.dragSource === this.dragTarget) {
					if (dragEnterDepth === 0)
						_dragenter.call(this, draggedData.model, event);

					dragEnterDepth++;
				}
			};
		}

		var _dragleave = events.dragleave;

		if (_dragleave) {
			events.dragleave = function (event) {
				if (draggedData.dragSource === this.dragTarget)
					dragEnterDepth--

					if (dragEnterDepth === 0)
						_dragleave.call(this, draggedData.model, event);
			};
		}
	};

	var dragDropMixIn = function (parent) {
		return {
			delegateEvents: function (events) {
				var events = events || _.clone(this.events);

				if (this.dragSource)
					replaceDragSourceEvents(events);

				if (this.dragTarget)
					replaceDragTargetEvents(events);

				parent.prototype.delegateEvents.call(this, events);
			}
		};
	};

	return dragDropMixIn;
});

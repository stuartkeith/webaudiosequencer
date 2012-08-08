define([
	"underscore",
	"backbone"
], function(_, Backbone) {
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
			_.each(this.eventBusEvents, function (fn, event) {
				this.eventBus.on(event, getProperty(this, fn), this);
			}, this);
		},

		undelegateEventBusEvents: function () {
			_.each(this.eventBusEvents, function (fn, event) {
				this.eventBus.off(event, getProperty(this, fn), this);
			}, this);
		},

		delegateModelEvents: function () {
			if (this.model) {
				_.each(this.modelEvents, function (fn, event) {
					this.model.on(event, getProperty(this, fn), this);
				}, this);
			}
		},

		undelegateModelEvents: function () {
			if (this.model) {
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

	return ExtendedView;
});

define([
	"underscore",
	"backbone",
	"baseView",
	"text!templates/soundBrowser/soundBrowser.html",
	"text!templates/soundBrowser/errorDescription.txt",
	"./collections/freeSoundCollection",
	"./collections/soundCloudCollection",
	"./views/soundsView"
], function(_, Backbone, BaseView, SoundBrowserTemplateString, ErrorDescriptionTemplateString, FreeSoundCollection, SoundCloudCollection, SoundsView) {
	var soundsViewColumns = 7;
	var soundsViewRows = 4;
	var soundsViewTotal = soundsViewColumns * soundsViewRows;

	var SoundBrowserView = BaseView.extend({
		className: "sound-browser",
		soundBrowserTemplate: _.template(SoundBrowserTemplateString),
		errorDescriptionTemplate: _.template(ErrorDescriptionTemplateString),
		refreshIconClass: "sprite-buttons-refresh-large",
		refreshErrorIconClass: "sprite-buttons-error-large",
		page: 1,

		collectionOptions: {
			defaultFetchOptions: {
				duration: 3,
				limit: soundsViewTotal
			}
		},

		initialize: function () {
			this.enabled = true;

			this.collections = [
				new FreeSoundCollection(this.collectionOptions),
				new SoundCloudCollection(this.collectionOptions)
			];
		},

		events: {
			"change .collection-select": function (event) {
				var collection = _.find(this.collections, function (collection) {
					return collection.className === event.target.value;
				});

				this.changeCollection(collection);
			},

			"click .refresh": "fetch",

			"click .previous": "fetchPrevious",

			"click .next": "fetchNext",

			"change .search-input": "fetch"
		},

		fetch: function () {
			if (this.enabled) {
				this.page = 1;

				this._fetch();
			}
		},

		fetchNext: function () {
			if (this.nextEnabled) {
				this.page++;

				this._fetch();
			}
		},

		fetchPrevious: function () {
			if (this.previousEnabled) {
				this.page--;

				this._fetch();
			}
		},

		_fetch: function () {
			var self = this;

			this.refreshButton.button("option", "icons", {
				primary: this.refreshIconClass
			});

			this.setEnabled(false);
			this.soundsView.render();

			var data = {
				page: this.page,
				search: this.searchInput.val()
			};

			this.collection.fetch({
				data: data,
				success: function (collection, response) {
					self.setEnabled(true);

					// rendering can be time-intensive.
					// delay it so that the CSS animation can finish smoothly first.
					setTimeout(function () {
						self.soundsView.render(collection);
					}, 100);
				},
				error: function (collection, response) {
					var errorContext = {
						name: self.collection.name,
						statusCode: response.status,
						statusText: response.statusText
					};

					self.refreshButton.button("option", "icons", {
						primary: self.refreshErrorIconClass
					});

					self.refreshButton.prop("title", self.errorDescriptionTemplate(errorContext));

					self.setEnabled(true);
				}
			});
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.soundBrowserTemplate({
				collections: this.collections,
				_: _
			}));

			this.collectionSelect = this.$el.find(".collection-select:first").buttonset();

			this.refreshButton = this.$el.find(".refresh:first").button({
				icons: {
					primary: this.refreshIconClass
				},

				text: false
			});

			this.nextButton = this.$el.find(".next:first").button({
				icons: {
					primary: "sprite-buttons-next-large"
				},

				text: false
			});

			this.previousButton = this.$el.find(".previous:first").button({
				icons: {
					primary: "sprite-buttons-previous-large"
				},

				text: false
			});

			this.searchInput = this.$el.find(".search-input:first");

			var sounds = this.$el.find(".sounds:first");

			this.soundsView = this.addChildView(SoundsView, {
				el: sounds,
				columns: soundsViewColumns,
				rows: soundsViewRows
			});

			this.changeCollection(this.collections[0]);

			return this;
		},

		changeCollection: function (collection) {
			if (this.collection)
				this.$el.removeClass(this.collection.className);

			this.collection = collection;

			this.$el.addClass(this.collection.className);

			this.searchInput.prop("placeholder", "Search " + this.collection.name);

			// refresh must be called afterwards.
			this.collectionSelect.find("input:radio[value=" + this.collection.className + "]").prop("checked", true).button("refresh");

			this.fetch();
		},

		setEnabled: function (value) {
			var limit = this.collectionOptions.defaultFetchOptions.limit;
			this.enabled = value;
			this.previousEnabled = this.page > 1;
			this.nextEnabled = this.collection.length >= limit;

			this.collectionSelect.buttonset('option', 'disabled', !value);
			this.searchInput.attr('disabled', !value);
			this.refreshButton.button('option', 'disabled', !value);
			this.previousButton.button('option', 'disabled', !(value && this.previousEnabled));
			this.nextButton.button('option', 'disabled', !(value && this.nextEnabled));
		}
	});

	return SoundBrowserView;
});

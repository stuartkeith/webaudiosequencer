define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    SoundBrowserTemplateString = require("text!templates/soundBrowser/soundBrowser.html"),
	    soundBrowserError = require("text!templates/soundBrowser/soundBrowserError.txt"),
	    FreeSoundCollection = require("./collections/freeSoundCollection"),
	    SoundCloudCollection = require("./collections/soundCloudCollection"),
	    SoundsView = require("./views/soundsView"),
	    VolumeView = require("application/volumeView");

	var soundsViewColumns = 7,
	    soundsViewRows = 4,
	    soundsViewTotal = soundsViewColumns * soundsViewRows;

	var SoundBrowserView = BaseView.extend({
		className: "sound-browser",
		soundBrowserTemplate: _.template(SoundBrowserTemplateString),
		soundBrowserErrorTemplate: _.template(soundBrowserError.trim()),
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
						name: self.collection.name
					};

					if (response.status === 0)
						errorContext.error = "Network error - the host is unreachable or returning an incorrect response";
					else
						errorContext.error = "Error " + response.status + " - " + response.statusText;

					self.refreshButton.button("option", "icons", {
						primary: self.refreshErrorIconClass
					});

					self.refreshButton.prop("title", self.soundBrowserErrorTemplate(errorContext));

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

			var volumeView = this.addChildView(VolumeView, {
				el: this.$(".master-volume:first"),
				model: this.model.soundOutput
			}).render();

			volumeView.on("change", this.volumeViewChange, this);

			this.collectionSelect = this.$(".collection-select:first").buttonset();

			this.refreshButton = this.$(".refresh:first").button({
				icons: {
					primary: this.refreshIconClass
				},

				text: false
			});

			this.nextButton = this.$(".next:first").button({
				icons: {
					primary: "sprite-buttons-next-large"
				},

				text: false
			});

			this.previousButton = this.$(".previous:first").button({
				icons: {
					primary: "sprite-buttons-previous-large"
				},

				text: false
			});

			this.searchInput = this.$(".search-input:first");

			var sounds = this.$(".sounds:first");

			this.soundsView = this.addChildView(SoundsView, {
				el: sounds,
				columns: soundsViewColumns,
				rows: soundsViewRows
			});

			this.collectionSource = this.$(".collection-source:first").button({
				icons: {
					primary: "sprite-buttons-source-large"
				},

				text: false
			});

			// start with a random collection.
			this.changeCollection(this.collections[_.random(this.collections.length - 1)]);

			return this;
		},

		volumeViewChange: function (value) {
			this.eventBus.trigger("setSoundOutputVolume", {
				volume: value
			});
		},

		changeCollection: function (collection) {
			if (this.collection)
				this.$el.removeClass(this.collection.className);

			this.collection = collection;

			this.$el.addClass(this.collection.className);

			this.searchInput.prop("placeholder", "Search " + this.collection.name);

			// refresh must be called afterwards.
			this.collectionSelect.find("input:radio[value=" + this.collection.className + "]").prop("checked", true).button("refresh");

			this.collectionSource.attr("href", this.collection.siteURL);
			this.collectionSource.prop("title", "Visit " + this.collection.name);

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

define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    buttonHelpers = require("utilities/buttonHelpers"),
	    SoundBrowserTemplateString = require("text!templates/soundBrowser/soundBrowser.html"),
	    soundBrowserError = require("text!templates/soundBrowser/soundBrowserError.txt"),
	    FreeSoundCollection = require("collections/freeSoundCollection"),
	    SoundCloudCollection = require("collections/soundCloudCollection"),
	    SoundsView = require("./views/soundsView"),
	    VolumeView = require("application/volumeView"),
	    Alertify = require("alertify");

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

			var audioElement = document.createElement("audio");

			this.collections = _.filter([
				new FreeSoundCollection(this.collectionOptions),
				new SoundCloudCollection(this.collectionOptions)
			], function (collection) {
				return audioElement.canPlayType(collection.soundMimeType);
			});
		},

		events: {
			"change .collection-select": function (event) {
				if (this.collection.className === event.target.value)
					return;

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
				this.page += 1;

				this._fetch();
			}
		},

		fetchPrevious: function () {
			if (this.previousEnabled) {
				this.page -= 1;

				this._fetch();
			}
		},

		_fetch: function () {
			var self = this;

			this.refreshButton.data("options").setIcon(this.refreshIconClass);

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
					var error, errorContext = {
						name: self.collection.name
					};

					if (response.status === 0)
						errorContext.error = "Network error - the host is unreachable or returning an incorrect response";
					else
						errorContext.error = "Error " + response.status + " - " + response.statusText;

					self.refreshButton.data("options").setIcon(self.refreshErrorIconClass);

					error = self.soundBrowserErrorTemplate(errorContext);

					self.refreshButton.prop("title", error);

					self.setEnabled(true);

					Alertify.dialog.confirm(error, function () {
						self._fetch();
					});
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

			this.collectionSelect = buttonHelpers.buttonset(this.$(".collection-select:first"));

			this.refreshButton = buttonHelpers.button(this.$(".refresh:first"), this.refreshIconClass);

			this.nextButton = buttonHelpers.button(this.$(".next:first"), "sprite-buttons-next-large");

			this.previousButton = buttonHelpers.button(this.$(".previous:first"), "sprite-buttons-previous-large");

			this.searchInput = this.$(".search-input:first");

			var sounds = this.$(".sounds:first");

			this.soundsView = this.addChildView(SoundsView, {
				el: sounds,
				columns: soundsViewColumns,
				rows: soundsViewRows
			});

			this.collectionSource = buttonHelpers.button(this.$(".collection-source:first"), "sprite-buttons-source-large");

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

			this.collectionSelect.find("input:radio[value=" + this.collection.className + "]").prop("checked", true).change();

			this.collectionSource.attr("href", this.collection.siteURL);
			this.collectionSource.prop("title", "Visit " + this.collection.name);

			this.fetch();
		},

		setEnabled: function (value) {
			var limit = this.collectionOptions.defaultFetchOptions.limit;
			this.enabled = value;
			this.previousEnabled = this.page > 1;
			this.nextEnabled = this.collection.length >= limit;

			this.collectionSelect.data('options').disable(!value);
			this.searchInput.attr('disabled', !value);
			this.refreshButton.data('options').disable(!value);
			this.previousButton.data('options').disable(!(value && this.previousEnabled));
			this.nextButton.data('options').disable(!(value && this.nextEnabled));
		}
	});

	return SoundBrowserView;
});

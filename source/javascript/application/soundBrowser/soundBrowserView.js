define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/soundBrowser/soundBrowser.html",
	"./collections/freeSoundCollection",
	"./collections/soundCloudCollection",
	"./views/soundsView"
], function(_, Backbone, BaseView, SoundBrowserTemplateString, FreeSoundCollection, SoundCloudCollection, SoundsView) {
	var SoundBrowser = BaseView.extend({
		className: "sound-browser",
		soundBrowserTemplate: _.template(SoundBrowserTemplateString),

		collectionOptions: {
			defaultFetchOptions: {
				duration: 3,
				limit: 10
			}
		},

		initialize: function () {
			this.collections = [
				new FreeSoundCollection(this.collectionOptions),
				new SoundCloudCollection(this.collectionOptions)
			];

			this.collectionSelectOptions = "";

			_.each(this.collections, function (collection) {
				this.collectionSelectOptions += "<option>" + collection.name + "</option>";
			}, this);
		},

		events: {
			"change .collection-select": function (event) {
				this.changeCollection(this.collections[event.target.selectedIndex]);
			},
			"click .refresh": "fetch"
		},

		fetch: function () {
			var that = this;

			this.setEnabled(false);
			this.soundsView.render();

			this.collection.fetch({
				success: function (collection, response) {
					that.setEnabled(true);
					that.soundsView.render(collection);
				},
				error: function () {
					console.log("error", arguments);
				}
			});
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.soundBrowserTemplate());

			this.collectionSelect = this.$el.find(".collection-select:first");
			this.collectionSelect.html(this.collectionSelectOptions);

			this.refreshButton = this.$el.find(".refresh:first");

			var sounds = this.$el.find(".sounds:first");

			this.soundsView = this.addChildView(SoundsView, { el: sounds });

			this.changeCollection(this.collections[0]);

			return this;
		},

		changeCollection: function (collection) {
			if (this.collection)
				this.$el.removeClass(this.collection.className);

			this.collection = collection;

			this.$el.addClass(this.collection.className);

			this.collectionSelect.val(this.collection.name);

			this.fetch();
		},

		setEnabled: function (value) {
			this.collectionSelect.attr('disabled', !value);
			this.refreshButton.attr('disabled', !value);
		}
	});

	return SoundBrowser;
});

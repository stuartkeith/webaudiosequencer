define([
	"use!underscore",
	"use!backbone"
], function(_, Backbone) {
	var FreeSoundCollection = Backbone.Collection.extend({
		name: "FreeSound",
		url: "http://www.freesound.org/api/sounds/search/",
		apiKey: "f9c1dfcdd51e4d90940f7719c964a43a",

		initialize: function (options) {
			this.defaultFetchOptions = options.defaultFetchOptions;
		},

		parse: function (response) {
			var convertedResponse = [];

			_.each(response.sounds, function (sound) {
				convertedResponse.push({
					duration: sound.duration,
					id: sound.id,
					sound_url: sound['preview-hq-mp3'] + "?apiKey=" + this.apiKey,
					source_name: this.name,
					source_url: sound.url,
					tags: sound.tags,
					title: sound.original_filename,
					user: { username: sound.user.username, url: sound.user.url }
				});
			}, this);

			return convertedResponse;
		},

		fetch: function (options) {
			var options = options || {};
			var existingData = options.data || {};
			options.data = {};

			var filterOptions = ["type:wav"];
			filterOptions.push("duration:[* TO " + (existingData.duration || this.defaultFetchOptions.duration) + "]");
			options.data.f = filterOptions.join(" ");

			options.data.sounds_per_page = existingData.limit || this.defaultFetchOptions.limit;

			options.data.api_key = this.apiKey;

			var searchOptions = ["created_desc"];
			options.data.s = searchOptions.join(" ");

			return Backbone.Collection.prototype.fetch.call(this, options);
		}
	});

	return FreeSoundCollection;
});

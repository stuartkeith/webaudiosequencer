define([
	"use!underscore",
	"use!backbone"
], function(_, Backbone) {
	var FreeSoundCollection = Backbone.Collection.extend({
		name: "FreeSound",
		className: "freesound",
		url: "http://www.freesound.org/api/sounds/search/",
		apiKey: "f9c1dfcdd51e4d90940f7719c964a43a",
		urlSubIndex: "http://www.freesound.org/data/previews/".length,
		fixedSoundURLPath: "freesound/",

		initialize: function (options) {
			this.defaultFetchOptions = options.defaultFetchOptions;
		},

		fixSoundURL: function (sound_url) {
			return this.fixedSoundURLPath + sound_url.substr(this.urlSubIndex) + "?apiKey=" + this.apiKey;
		},

		parse: function (response) {
			var convertedResponse = [];

			_.each(response.sounds, function (sound) {
				convertedResponse.push({
					duration: sound.duration,
					id: sound.id,
					sound_url: this.fixSoundURL(sound['preview-hq-mp3']),
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

			if (existingData.page)
				options.data.p = existingData.page;

			if (existingData.search)
				options.data.q = existingData.search;

			return Backbone.Collection.prototype.fetch.call(this, options);
		}
	});

	return FreeSoundCollection;
});

define(function (require) {
	var _ = require("underscore"),
	    Backbone = require("backbone");

	var FreeSoundCollection = Backbone.Collection.extend({
		name: "FreeSound",
		description: "a collaborative database of Creative Commons Licensed sounds.",
		siteURL: "http://www.freesound.org/",
		className: "freesound",
		url: "http://www.freesound.org/apiv2/search/text/",
		token: "f5841aeab4b8615b708e334f5e7033aedecd1ace",
		soundMimeType: "audio/ogg",

		initialize: function (options) {
			this.defaultFetchOptions = options.defaultFetchOptions;
		},

		fixSoundURL: function (sound_url) {
			return sound_url + "?token=" + this.token;
		},

		parse: function (response) {
			var convertedResponse = _.map(response.results, function (sound) {
				return {
					duration: sound.duration,
					id: sound.id,
					sound_url: this.fixSoundURL(sound.previews["preview-hq-ogg"]),
					source_name: this.name,
					source_url: sound.url,
					tags: sound.tags,
					title: sound.name,
					user: { username: sound.username, url: "" }
				};
			}, this);

			return convertedResponse;
		},

		fetch: function (options) {
			var options = options || {};
			var existingData = options.data || {};

			var search = existingData.search || "";
			var filter = "duration:[* TO " + (existingData.duration || this.defaultFetchOptions.duration) + "]";
			var limit = existingData.limit || this.defaultFetchOptions.limit;
			var page = existingData.page || 1;

			options.data = {
				"token": this.token,
				"query": search,
				"filter": filter,
				"sort": "created_desc",
				"fields": "id,url,name,tags,username,previews,duration",
				"page_size": limit,
				"page": page
			};

			return Backbone.Collection.prototype.fetch.call(this, options);
		}
	});

	return FreeSoundCollection;
});

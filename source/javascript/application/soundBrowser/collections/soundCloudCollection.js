define([
	"use!underscore",
	"use!backbone"
], function(_, Backbone) {
	var SoundCloudCollection = Backbone.Collection.extend({
		name: "SoundCloud",
		url: "http://api.soundcloud.com/tracks.json",
		clientID: "92a7894544c99bb2ba74e6ded0f3945a",

		initialize: function (options) {
			this.defaultFetchOptions = options.defaultFetchOptions;
		},

		parse: function (response) {
			var convertedResponse = [];

			_.each(response, function (sound) {
				convertedResponse.push({
					duration: sound.duration / 1000,
					id: sound.id,
					sound_url: sound.stream_url + "?client_id=" + this.clientID,
					source_name: this.name,
					source_url: sound.permalink_url,
					tags: sound.tag_list.split(" "),
					title: sound.title,
					user: { username: sound.user.username, url: sound.user.permalink_url }
				});
			}, this);

			return convertedResponse;
		},

		fetch: function (options) {
			var options = options || {};
			var existingData = options.data || {};
			options.data = {};

			options.data.filter = "streamable";
			options.data['duration[from]'] = 100;
			options.data['duration[to]'] = (existingData.duration || this.defaultFetchOptions.duration) * 1000;
			options.data.limit = existingData.limit || this.defaultFetchOptions.limit;
			options.data.client_id = this.clientID;

			return Backbone.Collection.prototype.fetch.call(this, options);
		}
	});

	return SoundCloudCollection;
});

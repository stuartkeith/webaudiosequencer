require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.8.2",
		jqueryUI: "libraries/jquery/jquery-ui-1.8.24.custom",
		jqueryPreloadCssImages: "libraries/jquery/preloadCssImages.jQuery_v5",
		underscore: "libraries/underscore/underscore-1.4.1",
		backbone: "libraries/backbone/backbone-0.9.2",
		templates: "../templates",
		text: "libraries/require/text-2.0.3"
	},

	shim: {
		underscore: {
			exports: "_"
		},

		backbone: {
			deps: ['underscore', 'jquery'],
			exports: "Backbone"
		},

		jqueryUI: ['jquery'],

		jqueryPreloadCssImages: ['jquery']
	}
});

require([
	"require",
	"jquery",
	"text!templates/unsupported.html"
], function (require, $, unsupportedTemplateString) {
	var description = $("#description"),
	    fadeInTime = 1200;

	if (window.webkitAudioContext) {
		var loading = $("<p>Loading...</p>");

		description.append(loading);

		loading.hide().fadeIn(fadeInTime);

		require(["application"]);
	} else {
		var unsupported = $(unsupportedTemplateString);

		description.append(unsupported);

		// filter("*") required as of Firefox 15.0
		// see http://bugs.jquery.com/ticket/12462
		unsupported.filter("*").hide().fadeIn(fadeInTime);
	}
});

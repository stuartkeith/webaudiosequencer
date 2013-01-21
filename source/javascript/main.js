require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.8.2",
		jqueryUI: "libraries/jquery/jquery-ui-1.9.0.custom",
		jqueryPreloadCssImages: "libraries/jquery/preloadCssImages.jQuery_v5",
		underscore: "libraries/underscore/underscore-1.4.1",
		backbone: "libraries/backbone/backbone-0.9.10",
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
	    fadeInTime = 1200,
	    fadeInContent;

	if (!window.webkitAudioContext) {
		fadeInContent = $(unsupportedTemplateString);
	} else if ('ontouchstart' in window) {
		fadeInContent = $("<p>Unfortunately, this application currently requires a mouse and keyboard.</p>\
			<p>Sorry about that.</p>");
	} else {
		fadeInContent = $("<p>Loading...</p>");

		require(["application"]);
	}

	description.append(fadeInContent);

	// filter("*") required as of Firefox 15.0
	// see http://bugs.jquery.com/ticket/12462
	fadeInContent.filter("*").hide().fadeIn(fadeInTime);
});

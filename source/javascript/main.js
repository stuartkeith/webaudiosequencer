require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.9.0",
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
	} else {
		fadeInContent = $("<p>Loading...</p>");

		require(["application"]);
	}

	description.append(fadeInContent);

	// filter("*") required as of Firefox 15.0
	// see http://bugs.jquery.com/ticket/12462
	fadeInContent.filter("*").hide().fadeIn(fadeInTime);
});

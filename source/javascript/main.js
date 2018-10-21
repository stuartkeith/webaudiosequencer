require([
	"require",
	"jquery",
	"text!templates/unsupported.html"
], function (require, $, unsupportedTemplateString) {
	var description = $("#description"),
	    fadeInTime = 1200,
	    fadeInContent;

	if (window.AudioContext || window.webkitAudioContext) {
		fadeInContent = $("<p>Loading...</p>");

		require(["application"]);
	} else {
		fadeInContent = $(unsupportedTemplateString);
	}

	description.append(fadeInContent);

	// filter("*") required as of Firefox 15.0
	// see http://bugs.jquery.com/ticket/12462
	fadeInContent.filter("*").hide().fadeIn(fadeInTime);
});

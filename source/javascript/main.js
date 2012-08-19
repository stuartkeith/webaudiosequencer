require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.7.2",
		jqueryUI: "libraries/jquery/jquery-ui-1.8.21",
		underscore: "libraries/underscore/underscore-1.3.3",
		backbone: "libraries/backbone/backbone-0.9.2",
		templates: "../templates",
		text: "libraries/require/text-2.0.1"
	},

	shim: {
		underscore: {
			exports: "_"
		},

		backbone: {
			deps: ['underscore', 'jquery'],
			exports: "Backbone"
		},

		jqueryUI: ['jquery']
	}
});

require([
	"underscore",
	"backbone",
	"jqueryUI",
	"soundOutput/soundOutput",
	"sequencer/sequencer",
	"tracks/trackCollection",
	"commandMap",
	"application/applicationView",
	"./keyboardShortcuts",
	"./windowListeners",
	"utilities/functionChain",
	"text!templates/unsupported.html"
], function (_, Backbone, jqueryUI, SoundOutput, Sequencer, TrackCollection, commandMap, ApplicationView, keyboardShortcuts, windowListeners, functionChain, unsupportedTemplateString) {
	var eventBus = _.clone(Backbone.Events);

	var commandObject = {
		eventBus: eventBus
	};

	_.each(commandMap, function (mappings, event) {
		_.each(mappings, function (map) {
			if (map.guards) {
				eventBus.on(event, function () {
					functionChain(map.guards, commandObject, arguments, map.successCommand, map.failureCommand);
				});
			} else {
				eventBus.on(event, map.successCommand, commandObject);
			}
		});
	});

	if (window.webkitAudioContext) {
		var context = new webkitAudioContext();

		commandObject.selectedTrackModel = null;
		commandObject.sequencer = new Sequencer(context, 16);
		commandObject.soundOutput = new SoundOutput(context);
		commandObject.trackCollection = new TrackCollection();

		var applicationView = new ApplicationView({
			eventBus: eventBus,
			el: "#container",
			model: {
				sequencer: commandObject.sequencer,
				soundOutput: commandObject.soundOutput,
				trackCollection: commandObject.trackCollection
			}
		});

		keyboardShortcuts(eventBus);
		windowListeners(eventBus);

		applicationView.render();

		eventBus.trigger("initialize");
	} else {
		var unsupported = $(unsupportedTemplateString);

		$("#description").append(unsupported);

		unsupported.hide();
		unsupported.fadeIn(1200);
	}
});

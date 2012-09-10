require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.8.0",
		jqueryUI: "libraries/jquery/jquery-ui-1.8.23",
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
	"sequencer/scheduler",
	"tracks/trackCollection",
	"commandMap",
	"application/applicationView",
	"./keyboardShortcuts",
	"./documentListeners",
	"utilities/functionChain",
	"text!templates/unsupported.html"
], function (_, Backbone, jqueryUI, SoundOutput, Scheduler, TrackCollection, commandMap, ApplicationView, keyboardShortcuts, documentListeners, functionChain, unsupportedTemplateString) {
	var eventBus = _.clone(Backbone.Events);

	var commandContext = {
		eventBus: eventBus
	};

	_.each(commandMap, function (mappings, event) {
		_.each(mappings, function (map) {
			if (map.guards) {
				eventBus.on(event, function () {
					functionChain(map.guards, commandContext, arguments, map.successCommand, map.failureCommand);
				});
			} else {
				eventBus.on(event, map.successCommand, commandContext);
			}
		});
	});

	if (window.webkitAudioContext) {
		var context = new webkitAudioContext();

		commandContext.scheduler = new Scheduler(context);
		commandContext.selectedTrackModel = null;
		commandContext.sequenceLength = 16;
		commandContext.sequencePosition = 0;
		commandContext.soundOutput = new SoundOutput(context);
		commandContext.trackCollection = new TrackCollection();

		var notes;

		commandContext.scheduler.on("update", function (delaySeconds) {
			commandContext.trackCollection.each(function (trackModel) {
				notes = trackModel.get("sequencer").next();

				trackModel.get("instrumentManager").processNotes(notes, function (buffer, note, volume) {
					commandContext.soundOutput.playBuffer(buffer, note, volume, delaySeconds);
				});
			});

			commandContext.sequencePosition++;

			if (commandContext.sequencePosition >= commandContext.sequenceLength)
				commandContext.sequencePosition = 0;
		});

		var applicationView = new ApplicationView({
			eventBus: eventBus,
			el: "#container",
			model: {
				scheduler: commandContext.scheduler,
				soundOutput: commandContext.soundOutput,
				trackCollection: commandContext.trackCollection
			}
		});

		keyboardShortcuts(eventBus);
		documentListeners(eventBus);

		applicationView.render();

		eventBus.trigger("initialize");
	} else {
		var unsupported = $(unsupportedTemplateString);

		$("#description").append(unsupported);

		unsupported.hide();
		unsupported.fadeIn(1200);
	}
});

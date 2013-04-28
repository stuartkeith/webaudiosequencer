define(function (require) {
	var _ = require("underscore"),
	    $ = require("jquery"),
	    Backbone = require("backbone"),
	    jqueryPreloadCssImages = require("jqueryPreloadCssImages"),
	    SoundOutput = require("soundOutput/soundOutput"),
	    Scheduler = require("sequencer/scheduler"),
	    TrackCollection = require("tracks/trackCollection"),
	    commandMap = require("commandMap"),
	    ApplicationView = require("application/applicationView"),
	    keyboardShortcuts = require("./keyboardShortcuts"),
	    documentListeners = require("./documentListeners"),
	    functionChain = require("utilities/functionChain");

	$.preloadCssImages();

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

	var context = window.AudioContext ? new AudioContext() : new webkitAudioContext();

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

	applicationView.$el.hide().fadeIn(1200);
});

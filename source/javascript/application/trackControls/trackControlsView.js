define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    TrackControlView = require("./views/trackControlView");

	var TrackControlsView = BaseView.extend({
		modelEvents: {
			"add": function (trackModel) {
				this.addTrackControlView(trackModel);
			}
		},

		render: function () {
			// add any existing trackModels
			_.each(this.model.models, this.addTrackControlView, this);

			return this;
		},

		addTrackControlView: function (trackModel) {
			var trackControlView = this.addChildView(TrackControlView, {
				model: trackModel
			});

			trackControlView.on("selectTrack", this.selectTrack, this);
			trackControlView.on("removeTrack", this.removeTrack, this);
			trackControlView.on("removeTrackControl", this.removeTrackControl, this);

			this.$el.append(trackControlView.render().$el);
		},

		selectTrack: function (trackModel) {
			this.eventBus.trigger("selectTrack", {
				trackModel: trackModel
			});
		},

		removeTrack: function (trackModel) {
			this.eventBus.trigger("removeTrack", {
				trackModel: trackModel
			});
		},

		removeTrackControl: function (trackControl) {
			this.removeChildView(trackControl);
		}
	});

	return TrackControlsView;
});

define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"./views/trackControlView"
], function(_, Backbone, BaseView, TrackControlView) {
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

			this.$el.append(trackControlView.render().$el);
		}
	});

	return TrackControlsView;
});

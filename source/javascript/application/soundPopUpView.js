define(function(require) {
	var $ = require("jquery"),
	    _ = require("underscore"),
	    BaseView = require("baseView"),
	    InstrumentManagerSelectionView = require("./instrumentManagerSelectionView");

	var SoundPopUpView = BaseView.extend({
		eventBusEvents: {
			"requestTrack": function (args) {
				this.instrumentManagerSelectionView.setModel(args.soundModel);

				// must show() before offset()
				this.instrumentManagerSelectionView.$el.show();

				this.instrumentManagerSelectionView.$el.offset({
					left: args.pageX - this.popUpWidthHalved,
					top: args.pageY - this.popUpHeightHalved
				});
			}
		},

		hidePopUp: function () {
			this.instrumentManagerSelectionView.setModel(null);

			this.instrumentManagerSelectionView.$el.hide();
		},

		initialize: function () {
			this.hidePopUpBound = _.bind(this.hidePopUp, this);
		},

		render: function () {
			this.instrumentManagerSelectionView = this.addChildView(InstrumentManagerSelectionView);

			this.instrumentManagerSelectionView.render();

			this.instrumentManagerSelectionView.$el.addClass("pop-up");

			this.$el.append(this.instrumentManagerSelectionView.$el);

			this.popUpWidthHalved = Math.round(this.instrumentManagerSelectionView.$el.outerWidth(true) / 2);
			this.popUpHeightHalved = Math.round(this.instrumentManagerSelectionView.$el.outerHeight(true) / 2);

			this.instrumentManagerSelectionView.$el.hide();

			this.instrumentManagerSelectionView.$el.click(this.hidePopUpBound);
			this.instrumentManagerSelectionView.$el.mouseleave(this.hidePopUpBound);
		}
	});

	return SoundPopUpView;
});

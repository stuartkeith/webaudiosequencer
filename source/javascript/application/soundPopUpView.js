define(function(require) {
	var BaseView = require("baseView"),
	    globalClickListener = require("utilities/globalClickListener"),
	    InstrumentManagerSelectionView = require("./instrumentManagerSelectionView");

	var SoundPopUpView = BaseView.extend({
		eventBusEvents: {
			"requestTrack": function (args) {
				this.instrumentManagerSelectionView.setModel(args.soundModel);

				// must show() before offset() (if hidden)
				if (this.popUpCount === 0)
					this.instrumentManagerSelectionView.$el.show();

				this.instrumentManagerSelectionView.$el.offset({
					left: args.pageX - this.popUpWidthHalved,
					top: args.pageY - this.popUpHeightHalved
				});

				this.popUpCount++;

				globalClickListener(null, function () {
					this.popUpCount--;

					if (this.popUpCount === 0)
						this.hidePopUp();
				}, this);
			}
		},

		initialize: function () {
			this.popUpCount = 0;
		},

		hidePopUp: function () {
			this.instrumentManagerSelectionView.setModel(null);

			this.instrumentManagerSelectionView.$el.hide();
		},

		render: function () {
			this.instrumentManagerSelectionView = this.addChildView(InstrumentManagerSelectionView);

			this.instrumentManagerSelectionView.render();

			this.instrumentManagerSelectionView.$el.addClass("pop-up");

			this.$el.append(this.instrumentManagerSelectionView.$el);

			this.popUpWidthHalved = Math.round(this.instrumentManagerSelectionView.$el.outerWidth(true) / 2);
			this.popUpHeightHalved = Math.round(this.instrumentManagerSelectionView.$el.outerHeight(true) / 2);

			this.hidePopUp();
		}
	});

	return SoundPopUpView;
});

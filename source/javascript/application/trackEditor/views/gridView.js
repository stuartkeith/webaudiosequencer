define(function (require) {
	var _ = require("underscore"),
	    BaseView = require("baseView"),
	    CanvasGrid = require("utilities/canvasGrid"),
	    canvasGridConfiguration = require("templates/trackEditor/gridView/canvasGridConfiguration"),
	    generateHSM = require("utilities/generateHSM"),
	    settings = require("settings");

	var GridView = BaseView.extend({
		className: "grid",

		HSM: generateHSM(["mousedown", "mouseup", "cellmove"], {
			play: {
				enter: function () {
					this.view.$el.addClass("play-state");
				},

				exit: function () {
					this.view.$el.removeClass("play-state");
				},

				mousedown: function (event) {
					return this.rootState.play.playDown;
				},

				mouseup: function (event) {
					return this.rootState.play;
				},

				playDown: {
					cellmove: function () {
						this.view.playNoteAtCurrentCell();
					}
				}
			},

			addOrRemove: {
				cellmove: function () {
					if (this.view.model.getNoteAt(this.view.currentCell)) {
						return this.rootState.addOrRemove.remove;
					} else {
						return this.rootState.addOrRemove.add;
					}
				},

				mouseup: function () {
					return this.rootState.addOrRemove;
				},

				add: {
					enter: function () {
						this.view.$el.addClass("add-state");
					},

					exit: function () {
						this.view.$el.removeClass("add-state");
					},

					mousedown: function () {
						return this.rootState.addOrRemove.add.addDown;
					},

					addDown: {
						enter: function () {
							this.yPosition = this.view.currentCell.y;
						},

						exit: function () {
							delete this.yPosition;
						},

						cellmove: function () {
							this.view.addNoteAtCurrentCell({
								y: this.yPosition
							});
						}
					}
				},

				remove: {
					enter: function () {
						this.view.$el.addClass("remove-state");
					},

					exit: function () {
						this.view.$el.removeClass("remove-state");
					},

					mousedown: function () {
						return this.rootState.addOrRemove.remove.removeDown;
					},

					removeDown: {
						cellmove: function () {
							this.view.removeNoteAtCurrentCell();
						}
					}
				}
			}
		}),

		initialize: function () {
			this.currentCell = {};

			this.hsm = new this.HSM({
				view: this
			});

			this.hsm.changeState(this.hsm.rootState.addOrRemove);

			this.canvasGrid = new CanvasGrid(this.$el.find("canvas:first")[0]);

			this.canvasGrid.setRows(settings.maxNotes);
			this.canvasGrid.setColumnWidth(settings.gridWidth);
			this.canvasGrid.setRowHeight(settings.instrumentHeight);
			this.canvasGrid.setSubCanvasses(canvasGridConfiguration.subCanvasses);
			this.canvasGrid.setCanvasSelector(canvasGridConfiguration.canvasSelector);
		},

		eventBusEvents: {
			"setGridViewState": function (args) {
				this.hsm.mouseup();

				this.hsm.changeState(this.hsm.rootState[args.state]);

				this.hsm.mousedown();

				if (this.currentCell.x != null && this.currentCell.y != null)
					this.hsm.cellmove();
			}
		},

		modelEvents: {
			"note:added": function (location) {
				this.drawNoteAt(location.x, location.y);
			},

			"note:removed": function (location) {
				this.canvasGrid.drawCanvasAt(location.x, location.y);
			}
		},

		events: {
			"mousedown": function (event) {
				this.mouseDown(event);
			},

			"mouseup": function (event) {
				this.mouseUp(event);
			},

			"mouseenter": function (event) {
				this.updateCurrentCell(event);

				this.mouseDown(event);
			},

			"mouseleave": function (event) {
				this.mouseUp(event);

				this.currentCell.x = this.currentCell.y = null;
			},

			"mousemove": function (event) {
				this.updateCurrentCell(event);
			}
		},

		mouseDown: function (event) {
			if (event.which === 1) {
				this.hsm.mousedown();

				this.hsm.cellmove();
			}
		},

		mouseUp: function (event) {
			if (event.which === 1) {
				this.hsm.mouseup();

				this.hsm.cellmove();
			}
		},

		updateCurrentCell: function (event) {
			var currentCell = this.canvasGrid.mouseEventToColumnAndRow(this.$el, event);

			if (currentCell.x !== this.currentCell.x || currentCell.y !== this.currentCell.y) {
				this.currentCell = currentCell;

				this.hsm.cellmove();
			}
		},

		addNoteAtCurrentCell: function (override) {
			this.model.addNoteAt(_.extend(this.currentCell, override));
		},

		removeNoteAtCurrentCell: function () {
			this.model.removeNoteAt(this.currentCell);
		},

		playNoteAtCurrentCell: function () {
			this.eventBus.trigger("playNote", {
				note: this.currentCell.y
			});
		},

		drawNoteAt: function (x, y) {
			this.canvasGrid.drawCanvasAt(x, y, this.canvasGrid.subCanvasses.note);
		},

		render: function () {
			this.canvasGrid.setColumns(this.model.getLength());
			this.canvasGrid.drawGrid(true);

			this.model.notes.each(function (location, value) {
				this.drawNoteAt(location.x, location.y);
			}, this);

			return this;
		}
	});

	return GridView;
});

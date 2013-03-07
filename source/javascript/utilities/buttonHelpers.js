define(function (require) {
	var buttonHelpers = {};

	buttonHelpers.button = function ($element, iconClass, isNotFirst, isNotLast) {
		var isCheckbox = $element.is("[type=checkbox]"),
		    $targetElement;

		if (isCheckbox) {
			$element.hide();

			$targetElement = $element.siblings("label[for='" + $element.attr("id") + "']");
		} else {
			$targetElement = $element;
		}

		$targetElement.addClass("button button-normal");

		if (!isNotFirst)
			$targetElement.addClass("button-left");

		if (!isNotLast)
			$targetElement.addClass("button-right");

		if (iconClass) {
			$targetElement.attr("title", $element.text());
			$targetElement.text("");

			var span = $("<span></span>");
			span.addClass("button-icon");
			span.addClass(iconClass);

			$targetElement.append(span);
		}

		$element.data("options", {
			disable: function (value) {
				$element.attr('disabled', value);
				$targetElement.toggleClass("button-disabled", value);
				$targetElement.toggleClass("button-normal", !value);

				$element.siblings("#" + $element.attr("for")).attr('disabled', value);
			},

			setIcon: function (newIconClass) {
				if (newIconClass !== iconClass) {
					span.removeClass(iconClass).addClass(newIconClass);

					iconClass = newIconClass;
				}
			},

			setActivated: function (value) {
				$targetElement.toggleClass("button-normal", !value).toggleClass("button-active", value);
			}
		});

		return $element;
	};

	buttonHelpers.buttonset = function ($element, options) {
		var labels, labelsLength, button, squareLeft, squareRight;

		if (!options)
			options = {};

		$element.addClass("buttonset");

		$element.find("input").hide();

		labels = $element.find("label, button");
		labelsLength = labels.length;

		labels.each(function (index, element) {
			squareLeft = (labelsLength && (index > 0));
			squareRight = (labelsLength && (index !== labelsLength - 1));

			button = buttonHelpers.button($(element), null, squareLeft, squareRight);
		});

		$element.on("change", function (event) {
			$(event.target).siblings("label").removeClass("button-active").addClass("button-normal");

			$(event.target).siblings("label[for='" + event.target.id + "']").addClass("button-active").removeClass("button-normal");
		});

		$element.data("options", {
			disable: function (value) {
				$element.find("label").each(function (index, element) {
					$(element).data("options").disable(value);
				});

				return $element;
			}
		});

		return $element;
	};

	return buttonHelpers;
});

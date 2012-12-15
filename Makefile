SCSS_FILES = $(shell find source/scss -type f -iname '*.scss')


build: source/css/main.css

source/css/main.css: source/css/images/buttons.png $(SCSS_FILES)
	@echo "Generating Sass files..."
	sass source/scss/main.scss source/css/main.css --style compressed

source/css/images/buttons.png: source/sprites/buttons/*.png glue-template.txt
	@echo "Generating spritesheets..."
	glue source/sprites/buttons --img=source/css/images --css=source/scss --extension=scss -u images/ --global-template='' --each-template='$(shell cat glue-template.txt)'

optimize: build
	@echo "Optimizing..."
	mkdir -p optimized/javascript/libraries/require
	r.js -o build.js
	rm -rf optimized/javascript/templates
	cp -r source/css optimized/css
ifneq ($(wildcard google-analytics.txt),)
	@echo "Inserting Google Analytics..."
	sed '/google analytics/r google-analytics.txt' source/index.html > optimized/index.html
else
	@echo "Skipping Google Analytics (google-analytics.txt not found)..."
	cp source/index.html optimized/index.html
endif

clean:
	rm -rf optimized
	rm -f source/css/images/buttons.png
	rm -f source/css/main.css
	rm -f source/scss/buttons.scss

.PHONY: optimize clean

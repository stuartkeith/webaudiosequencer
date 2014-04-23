SCSS_FILES = $(shell find source/scss -type f -iname '*.scss')


build: source/css/main.css

source/css/main.css: source/css/images/buttons.png $(SCSS_FILES)
	@echo "Generating Sass files..."
	sass source/scss/main.scss source/css/main.css --style compressed --load-path source/scss/alertify

source/css/images/buttons.png: source/sprites/buttons/*.png tools/glueTemplate.jinja
	@echo "Generating spritesheets..."
	glue source/sprites/buttons --img=source/css/images -u images/ --scss=source/scss --scss-template=tools/glueTemplate.jinja

optimize: build
	@echo "Optimizing..."
	rm -rf optimized/
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

deploy:
	rsync -avP -e ssh --delete --exclude=".*" -m optimized/* sk:~/webapps/static/html/webaudiosequencer

clean:
	rm -rf optimized
	rm -f source/css/images/buttons.png
	rm -f source/css/main.css
	rm -f source/scss/buttons.scss

.PHONY: optimize deploy clean

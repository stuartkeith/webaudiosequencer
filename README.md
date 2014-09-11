Web Audio Sequencer
===================

By [Stuart Keith](http://stuartkeith.com).

*Web Audio Sequencer* is a web application used to compose music. It sources
sounds from external websites, such as
[FreeSound](http://www.freesound.org), [SoundCloud](https://soundcloud.com),
etc.

[Try it here](http://webaudiosequencer.stuartkeith.com/).

It uses the following browser features:

- Web Audio API
- HTML5 drag and drop API
- Canvas
- CSS3 animations
- Page Visibility API (Chrome only)

This application uses the following libraries:

- [RequireJS](http://requirejs.org/) - module loading
- [jQuery](http://jquery.com/) - DOM manipulation and deferreds/promises
- [Underscore.js](http://underscorejs.org/) - various things!
- [Backbone.js](http://backbonejs.org/) - application structure
- [glue](https://github.com/jorgebastida/glue) - CSS spritesheet
  generation
- [Sass](http://sass-lang.com/) - CSS pre-processor
- [Alertify](https://github.com/fabien-d/alertify.js) - alert pop-ups


Building/Compiling/Deployment
-----------------------------

Run `make` to generate the spritesheets and Sass files.

`make optimize` will compile an optimized version (one JavaScript file) into
the `optimized` directory.


Credits
-------

The icons used are part of the [Default Icon](http://www.defaulticon.com/)
set by [interactivemania](http://www.interactivemania.com/).

The tiled background is the 'Subtle Dots' pattern by
[Designova](http://www.designova.net/) (downloaded via
[Subtle Patterns](http://subtlepatterns.com/subtle-dots/)).

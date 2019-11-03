Web Audio Sequencer
===================

*Web Audio Sequencer* is a web application used to compose music. It sources
sounds from [FreeSound](http://www.freesound.org) and [SoundCloud](https://soundcloud.com).

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
- [Sass](http://sass-lang.com/) - CSS pre-processor
- [Alertify](https://github.com/fabien-d/alertify.js) - alert pop-ups


Building/Compiling/Deployment
-----------------------------

`npm install` to install the dependencies.

`npm start` to generate the sprite sheet, compile Sass, and start a local HTTP
server. The application is available at http://localhost:8080/.

`npm run build` to generate a build.


Credits
-------

The icons used are part of the [Default Icon](http://www.defaulticon.com/)
set by [interactivemania](http://www.interactivemania.com/).

The tiled background is the 'Subtle Dots' pattern by
[Designova](http://www.designova.net/) (downloaded via
[Subtle Patterns](http://subtlepatterns.com/subtle-dots/)).

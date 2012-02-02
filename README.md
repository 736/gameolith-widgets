Gameolith Widgets
-----------------

You can embed and link to game demos and individual games on Gameolith using this lightweight script. It's completely open source, and licenced under Apache 2.0.

For a nice way to generate widget code, take a look at our brand spanking new website! http://736.github.com/gameolith-widgets/

Browser Support
---------------

Currently tested and working on:

  * Firefox 9
  * Chrome 15
  * Opera Mobile

Prerequisites
-------------

Include the widget JavaScript asynchronously, using the following snippet:

``` html
<script>
(function(d, c, id) {
	var h=d.getElementsByTagName(c)[0], s=d.createElement(c);
	if (!d.getElementById(id)) {
		s.async=true;
		s.id=id;
		s.src="http://736.github.com/gameolith-widgets/js/platform/widgets.min.js";
		h.parentNode.insertBefore(s, h);
	}
})(document, "script", "gameolith-js");
</script>
```

Or by including it at the bottom of your page:

``` html
<script src="http://736.github.com/gameolith-widgets/js/platform/widgets.min.js" id="gameolith-js"></script>
```

Demo download button
--------------------

You can turn pretty much any arbitrary element into a demo button. However, we recommend you use the `<a>` tag to provide a graceful fallback in the event of a lack of JavaScript or an incompatible browser.

``` html
<a href="http://www.gameolith.com/game/beep/" class="gameolith-demo" data-widget="button" data-game="beep">Try BEEP for GNU/Linux</a>
```

The `data-game` attribute defines the game you want a demo button of. So if you wanted a demo of [SpaceChem](http://www.gameolith.com/game/spacechem/), you would change this attribute to `spacechem`.

The contents of the tag become the label of the button. You can use any kind of text you want. For example:

``` html
<a href="http://www.gameolith.com/game/beep/" class="gameolith-demo" data-widget="button" data-game="beep">BEEP Linux Demo</a>
```

When the button is clicked, an overlay appears with the Linux distribution autodetected, and a prompt to download.

Demo download box
-----------------

Same syntax as the download button. This time though, the contents of the overlay are embedded on the page itself. The contents of the tag are ignored.

``` html
<a href="http://www.gameolith.com/game/spacechem/" class="gameolith-demo" data-widget="box" data-game="spacechem">Try SpaceChem for GNU/Linux</a>
```

Build your own
--------------

This project mixes pure JavaScript with [CoffeeScript](http://coffeescript.org) and concatenates it all together in a small makefile, and then compresses the lot with [YUI Compressor](http://developer.yahoo.com/yui/compressor/) (included).

Install the CoffeeScript compiler, ensure you have Java installed, then run `make` from the root of the project. All the files you need will be placed in the `dist/` directory.
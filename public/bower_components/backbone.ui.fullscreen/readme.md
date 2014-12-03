# Backbone UI: Fullscreen

A UI element to switch between fullscreen modes


## Examples

* [Default Icon](http://rawgit.com/backbone-ui/fullscreen/master/examples/icon.html)


## Install

Using bower
```
bower install backbone.ui.fullscreen
```

## Usage
In its basic implementation, the plugin is available under the ```Backbone.UI``` namespace.

Simply initialize the View on the element you'd like a add the fullscreen action. For example:
```
var fullscreen = new Backbone.UI.Fullscreen({
	el: "a.fullscreen"
});
```


## Options

These are the varialbes that give you access to a number of features of the plugin

* **targetEl**: (default: "body" ), the element that will be targeted in fullscreen mode
* **style**: (default: "default" ), the style of the fullscreen icon. Setting it to "false" doesn't apply any styling


## Showcase

A few of the sites using this open source:

[![Stellar Fight](http://appicon.makesit.es/stellarfight.i-ga.me)](http://stellarfight.i-ga.me)


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org)

Default icon courtesy of [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:High-contrast-view-fullscreen.svg)


## License

Released under the [MIT license](http://makesites.org/licenses/MIT)

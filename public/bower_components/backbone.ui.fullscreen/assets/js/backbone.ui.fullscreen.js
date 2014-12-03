
/* Backbone UI: Fullscreen
 * Source: https://github.com/backbone-ui/fullscreen
 * Copyright © Makesites.org
 *
 * Initiated by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(w, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;


	var Fullscreen = View.extend({

		el : '.ui-fullscreen',

		options : {
			targetEl: "body",
			style: "default"
		},

		events: {
			"click": "toggle",
		},

		state: {
			fullscreen: false
		},

		initialize: function( options ) {
			// add ui class
			$(this.el).addClass("ui-fullscreen");
			if( this.options.style ){
				$(this.el).addClass( this.options.style );
			}
			return View.prototype.initialize.call( this, options );
		},

		// Events

		toggle: function() {

			if( !this.state.fullscreen ){
				this.enterFullscreen();
			} else {
				this.exitFullscreen();
			}

		},

		onFullScreenEnter: function( e ) {
			//console.log("Entered fullscreen!");
			var el = e.target;
			// update monitors
			el.onwebkitfullscreenchange = this.onFullScreenExit;
			el.onmozfullscreenchange = this.onFullScreenExit;
		},

		// Called whenever the browser exits fullscreen.
		onFullScreenExit: function() {
			//console.log("Exited fullscreen!");
		},

		// Note: FF nightly needs about:config full-screen-api.enabled set to true.
		enterFullscreen: function() {

			//var el = $(this.options.targetEl).get(0);
			var el = document.querySelector(this.options.targetEl);

			if( el == null ) return;

			if (el.webkitRequestFullScreen) {
				el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else {
				el.mozRequestFullScreen();
			}
			// add class on target
			$(el).addClass("ui-fullscreen-active");

			// events
			el.ondblclick = this.exitFullscreen;

			// add these on initialize?
			el.onwebkitfullscreenchange = this.onFullScreenEnter;
			el.onmozfullscreenchange = this.onFullScreenEnter;

			// bind event to the app
			this.state.fullscreen = true;
			//app.state.fullscreen = true;
			//document.getElementById('enter-exit-fs').onclick = exitFullscreen;
		},

		exitFullscreen: function( e ) {
			//console.log("exitFullscreen()");
			if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else {
				document.webkitCancelFullScreen();
			}
			var el = document.querySelector(this.options.targetEl);
			// remove class
			$(el).removeClass("ui-fullscreen-active");

			// bind event to the app
			this.state.fullscreen = false;
			//app.state.fullscreen = false;
		}
	});


	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Fullscreen;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define( ['underscore', 'backbone'], function () { return Fullscreen; } );
			define( [], function () { return Fullscreen; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.View = Fullscreen;
			APP.UI = APP.UI || {};
			APP.UI.Fullscreen = Fullscreen;
			// save namespace
			window.APP = APP;
		} else {
			Backbone.View = Fullscreen;
		}
		// update Backbone namespace regardless
		Backbone.UI = Backbone.UI || {};
		Backbone.UI.Fullscreen = Fullscreen;
		window.Backbone = Backbone;
	}


})(this.window, this._, this.Backbone, this.APP);

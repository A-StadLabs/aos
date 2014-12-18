(function(document) {
  'use strict';



  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('aOS is ready to rock!');
  });

  document.addEventListener('to-Top', function() {
    // Perform some behaviour
    console.log('Its lonely at the top.');
    document.querySelector('#mainContainer').scroller.scrollTop = 0;
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));

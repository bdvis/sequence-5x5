var $ = require('jquery-browserify'),
    Slideshow = require('./app/slideshow')();

$(window).on('keyup', function(e) {
  if (e.which === 39)
    Slideshow.go(1);
  
  if (e.which === 37)
    Slideshow.go(-1);
})

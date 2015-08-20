var $ = require('jquery-browserify'),
    Slide = require('./slide'),
    API = require('../utils/api');

module.exports = function Slideshow() {
  
  var slides = [],
      curr_index = -1;
  
  init();
  
  function init() {
    $('section').each(function(i) {
      slides.push(new Slide($(this), i));
    });
  };
  
  function go(dir) {
    var last_index = curr_index;
    
    curr_index += dir;
    
    if (dir > 0) {
      if (slides[curr_index])
        slides[curr_index].show();
      
      return;
    }
    
    if (slides[last_index])
      slides[last_index].hide().then(function() {
        if (slides[curr_index])
          slides[curr_index].show();
      });
    else if (slides[curr_index])
      slides[curr_index].show();
  };
  
  API.on(API.remote, API.remote.navigation, function(direction) {
    go(direction);
  });
  
  return {
    go: go
  };
  
};

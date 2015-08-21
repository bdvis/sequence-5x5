var $ = require('jquery-browserify'),
    Slideshow = require('./app/slideshow')(),
    Graph = require('./app/graph')(),
    API = require('./utils/api');

$(window).on('keyup', function(e) {
  if (e.which === 39)
    Slideshow.go(1);
  
  if (e.which === 37)
    Slideshow.go(-1);
});

$('section.lie').on('shown', function() {
  API.send(API.vote, API.vote.show_vote, { id: Number(this.id) });
});

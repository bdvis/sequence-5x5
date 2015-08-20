var $ = require('jquery-browserify'),
    API = require('./api');

module.exports = function(use_click) {
  $('[data-action]').on(use_click? 'click' : 'touchend', function(e) {
    e.preventDefault();
  
    var $this = $(this);
  
    API.send($this.data('role'), $this.data('action'), $(this).data('data'));
  });
};

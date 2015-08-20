var $ = require('jquery-browserify'),
    TweenLite = require('gsap/src/uncompressed/TweenLite');

module.exports = function($els, reverse) {
  
  var d = $.Deferred(),
      queue = [],
      queue_index = -1;
  
  function tween($el, time) {
    var o = { i: reverse? $el.data('str').length : 0 },
        d = $.Deferred();
    
    new TweenLite(o, time, {
      i: reverse? 0 : $el.data('str').length,
      ease: 'Quart.easeOut',
      onUpdate: function() {
        $el[0].innerHTML = $el.data('str').substr(0, o.i)
      },
      onComplete: function() {
        d.resolve();
      }
    });
    
    return d;
  };
  
  function processQueue() {
    queue_index++;
    
    if (!queue[queue_index])
      return d.resolve();
    
    tween(queue[queue_index], 1 / queue.length).done(processQueue);
  };
  
  if (reverse)
    $els = $($els.get().reverse());
  
  $els.each(function() {
    var $el = $(this);
    
    if (!$el.data('str'))
      $el.data('str', $el.html());
    
    if (!reverse)
      $el.html('');
    
    queue.push($el);
  });
  
  return function() {
    processQueue();
    
    return d;
  };
  
};

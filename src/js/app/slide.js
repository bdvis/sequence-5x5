var Typer = require('../utils/typer');

function Slide($el, id) {
  
  var $backdrop = $el.find('.backdrop'),
      pulses = $backdrop.hasClass('pulses');
  
  function show() {
    var d = $.Deferred()
        t = null;
    
    $el.trigger('shown');
    
    if ($backdrop.hasClass('is-fullscreen')) {
      d.resolve();
      
      return d;
    }
    
    t = new Typer($el.find('.content > *'));
    
    $backdrop.one('animationend', function() {
      t().done(d.resolve);
    });

    if (pulses)
      $backdrop.removeClass('pulses');

    $backdrop.addClass('is-fullscreen');

    $el.addClass('active');
    
    return d;
  };
  
  function hide() {
    var d = $.Deferred(),
        t = new Typer($el.find('.content > *'), true);
    
    t().done(function() {
      $backdrop.one('animationend', function() {
        $backdrop.removeClass('is-fullscreen leaving-fullscreen');
        
        if (pulses)
          $backdrop.addClass('pulses');
        
        d.resolve();
      });
      
      $backdrop.addClass('leaving-fullscreen');
    });
    
    return d;
  };
  
  return {
    show: show,
    hide: hide
  };
  
};

module.exports = Slide;

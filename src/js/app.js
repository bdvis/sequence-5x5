var $ = require('jquery-browserify'),
    io = require('socket.io-client')(),
    TweenLite = require('gsap/src/uncompressed/TweenLite');

io.on('connect', init);

function init() {
  io.on('event', function(data) {
    $('ul').append('<li>' + data.msg + '</li>');
  });
};

$('.backdrop.pulses').on('click', function() {
  $(this).toggleClass('is-fullscreen');
})

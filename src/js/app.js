var $ = require('jquery-browserify'),
    io = require('socket.io-client')();

io.on('connect', init);

function init() {
  io.on('event', function(data) {
    $('ul').append('<li>' + data.msg + '</li>');
  });
};

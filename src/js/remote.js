var $ = require('jquery-browserify'),
    io = require('socket.io-client')();

$('button').on('click', function(e) {
  e.preventDefault();
  
  io.emit('event', { msg: 'Remote says hi.' });
});

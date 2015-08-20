var $ = require('jquery-browserify'),
    io = require('socket.io-client')(),
    
    listeners = [],
    roles = {
      remote: {
        toString: function() { return 'remote'; },
        
        // Called when navigating forward/backwards
        navigation: 'navigation'
      }
    };

io.on('message', function(message) {
  listeners.forEach(function(listener) {
    if (listener.role !== message.role ||
        listener.type !== message.type ||
        listener.callback === null)
      return;
    
    
    listener.callback.apply(null, [ message.data ]);
  });
});

function on(role, type, callback) {
  listeners.push({
    role: role.toString(),
    type: type.toString(),
    callback: callback
  });
};

function send(role, type, data) {
  io.emit('message', {
    role: role.toString(),
    type: type.toString(),
    data: data
  });
};

module.exports = $.extend(roles, {
  on: on,
  send: send
});

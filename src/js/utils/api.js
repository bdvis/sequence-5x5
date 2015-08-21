var $ = require('jquery-browserify'),
    io = require('socket.io-client')(),
    
    listeners = [],
    roles = {
      remote: {
        toString: function() { return 'remote'; },
        
        // Called when navigating forward/backwards
        navigation: 'navigation'
      },
      vote: {
        toString: function() { return 'vote'; },
        
        // Reset all votes to 0
        reset_votes: 'reset_votes',
        
        // Submit a vote with { "id": "choiceID" }
        submit_vote: 'submit_vote',
        
        // After voting happens, sends the voting data
        received_votes: 'received_votes',
        get_votes: 'get_votes', // Alias of received_votes
        
        // Show a vote
        show_vote: 'show_vote',
        
        // A vote was shown
        showed_vote: 'showed_vote',
        get_shown_votes: 'get_shown_votes'
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

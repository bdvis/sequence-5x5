var http = require('http'),
    express = require('express'),
    socket = require('socket.io'),
    chalk = require('chalk'),
    
    local = process.env.PORT !== '80',
    
    app = express(),
    server = http.createServer(app),
    io = socket(server),
    
    vote_count = 0,
    votes = getDefaultVotes();

app.use('/', express.static('public', {
  etag: local? false : true
}));

server.listen(process.env.PORT || 3000);

io.on('connection', function(socket) {
  console.log(chalk.green('[Client]'), chalk.green('Connected'));
  
  socket.on('message', function(data) {
    if (data.role == 'vote')
      return handleVote(data);
    
    io.emit('message', data);
  });
  
  socket.on('disconnect', function() {
    console.log(chalk.green('[Client]'), chalk.yellow('Disconnected'));
  });
});

function handleVote(vote) {
  switch (vote.type) {
    case 'reset_votes':
      resetVotes();
    break;
    case 'submit_vote':
      voteSubmitted(vote);
    break;
    case 'get_votes':
      sendVotes();
    break;
  }
};

function getDefaultVotes() {
  return {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  };
};

function resetVotes() {
  vote_count = 0;
  votes = getDefaultVotes();
  
  sendVotes();
};

function voteSubmitted(vote) {
  vote_count += 1;
  
  if (votes.hasOwnProperty(vote.data.id))
    votes[vote.data.id] += 1;
  else
    votes[vote.data.id] = 1;
  
  sendVotes();
};

function sendVotes() {
  io.emit('message', {
    role: 'vote',
    type: 'received_votes',
    data: {
      count: vote_count,
      votes: votes
    }
  });
};

console.log(chalk.green('[Server]'), process.env.PORT || 3000);

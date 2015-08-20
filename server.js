var http = require('http'),
    express = require('express'),
    socket = require('socket.io'),
    chalk = require('chalk'),
    
    local = process.env.PORT !== '80',
    
    app = express(),
    server = http.createServer(app),
    io = socket(server);

app.use('/', express.static('public', {
  etag: local? false : true
}));

server.listen(process.env.PORT || 3000);

io.on('connection', function(socket) {
  console.log(chalk.green('[Client]'), chalk.green('Connected'));
  
  socket.on('message', function(data) {
    io.emit('message', data);
  });
  
  socket.on('disconnect', function() {
    console.log(chalk.green('[Client]'), chalk.yellow('Disconnected'));
  });
});

console.log(chalk.green('[Server]'), process.env.PORT || 3000);

var express = require('express')
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketio(server);

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

io.on('connection', function(socket) {
	socket.emit('chat message', 'user connected');
	socket.on('chat message',  function(msg) {
		console.log('message: ' + msg);
		socket.broadcast.emit('chat message', msg);
	});
	socket.on('disconnect', function() {
		socket.emit('chat message', 'a user disconnected');
	});
});

server.listen(3000, function() {
	console.log('listening on *:3000');
});
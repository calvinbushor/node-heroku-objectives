var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	
server.listen(3030);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		io.sockets.emit('new message', data);
	});
});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//this function will return the "index.html" file to the requester
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var allClients = {};
var chatLog = {};

//this holds all functions for the chat room
io.on('connection', function(socket){

	//this part is when someone joins, it stores the socket and username
	//for tracking purposes
	socket.on('joined', function(username){
		io.emit('joined', username + " joined the room...");
		allClients[socket.id] = [];
		allClients[socket.id].socket = socket;
		allClients[socket.id].username = username;
	});

	//this will transmit the current conversation
/*
	}*/
	//this function emits a message when sent
	socket.on('chat message', function(message){
		 io.emit('chat message', message);
	});

	socket.on('typing', function(){
		var typer = allClients.indexOf(socket);
		io.emit('typing', allClients[1]["name"] + " is typing...");
	});

	//this function catches a disconnect and matches it to the username
	//it then emits a message that the user disconnected
	socket.on('disconnect', function(){
		var username = allClients[socket.id].username;
		io.emit('disconnect', username + " left the room...");
		delete allClients[socket.id];
	});

});

//this function sets up the web server attaching port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});

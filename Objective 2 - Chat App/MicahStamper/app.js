var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//this function will return the "index.html" file to the requester
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var allClients = {};

//this holds all functions for the chat room
io.on('connection', function(socket){

	//this part is when someone joins, it stores the socket and username
	//for tracking purposes
	socket.on('joined', function(username){
		allClients[socket.id] = {socket: socket, name:username};
		allClients[socket.id].socket = socket;
		allClients[socket.id].name = username;
		io.emit('chat message', {name:username, msg: username + " has joined the room", type:"join"});
	});

	//this function emits a message when sent and logs
	socket.on('chat message', function(message){
		io.emit('chat message', message);
	});

/*
	socket.on('typing', function(){
		var typer = allClients.indexOf(socket);
		//TODO: Need to work on this functionality
		//io.emit('typing', allClients[1]["name"] + " is typing...");
	});
*/
	//this function catches a disconnect and matches it to the username
	//it then emits a message that the user disconnected
	socket.on('disconnect', function(){
		var username = allClients[socket.id].name;
		io.emit('chat message', {name:username, msg:username + " left the room...", type:"leave"});
		delete allClients[socket.id];
	});

});

//this function sets up the web server attaching port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//this function will return the "index.html" file to the requester
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var allClients = {};
var chatLog = [];

//{name:"", msg:"Welcome to the Node.js Chat App",type:"chat"}

//this holds all functions for the chat room
io.on('connection', function(socket){

	//this part is when someone joins, it stores the socket and username
	//for tracking purposes
	socket.on('joined', function(message){
		allClients[socket.id] = {tracker:socket, name:message.name};
		socket.emit('sendLog',chatLog);
		chatLog.push(message);
		io.emit('chat message', message);
	});

	//this function emits a message when sent and logs
	socket.on('chat message', function(message){
	//	chatlog.push(message);
		io.emit('chat message', message);
		chatLog.push(message);
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
		var message = {name:username, msg:username + " left the room...", type:"leave"}
		chatLog.push(message);
		io.emit('chat message', message);
		delete allClients[socket.id];
	});

});

//this function sets up the web server attaching port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});

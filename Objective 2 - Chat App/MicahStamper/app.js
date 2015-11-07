var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = require("./myModules/Clients/clients");
var logs = require("./myModules/Logs/logs");

//this function will return the "index.html" file to the requester
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//this holds all functions for the chat room
io.on('connection', function(socket){

	/*This event is fired from the client browser when they load the page
		This stores their info indexed by socket.id, sends a log, and let's everyone know*/
	socket.on('joined', function(message){
		clients.add(socket.id, message.name);
		socket.emit('sendLog',logs.getLogs());
		logs.add(message);
		io.emit('chat message', message);
	});

	//this function emits a message when sent and logs it
	socket.on('chat message', function(message){
		io.emit('chat message', message);
		logs.add(message);
		clients.get(socket.id).updateActivity();
	});

/*This is for displaying if a user is typing
	if the client sends a 1, then they are typing
	if they send a 0, they have stoped typing*/

	socket.on('typing', function(trigger){
		if(trigger == 1){
			var client = clients.get(socket.id);
			io.emit('typing', client.username + " is typing...");
			client.updateActivity();
		}
		else if(trigger == 0){
			io.emit('typing', "");
		}
	});

	/*this function catches a disconnect and matches it to the username
		it then emits a message that the user disconnected and logs it	*/

	socket.on('disconnect', function(){
			var username = clients.get(socket.id).username;
			clients.remove(socket.id);
			var message = {name:username, msg:username + " left the room...", type:"leave"}
			logs.add(message);
			io.emit('chat message', message);
	});
});

//this function sets up the web server attaching port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});

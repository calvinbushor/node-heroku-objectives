var client = require("./client");
var clientIO = require("./ClientIO");
var stats = require("../api/stats.js");
var timestamp = require("../timestamp");
var clients = [];

clientsStartup();
//this function will create a new client and add it to the array as well as write to file
function addClient(id, username){
    var newClient = new client(id,username);
    clients.push(newClient);
    stats.addUser(newClient);
    clientIO.addClient(newClient);
}

//this function will remove a client from the array as well as delete form the file
function removeClient(id){
    var index = findClientByID(id);
    if(index != -1){
      clients[index].updateActivity();
      clientIO.removeClient(id);
      clients.splice(index,1);
    }
}

//Given a client ID, it will update their activity
function updateActivity(id)
{
  var index = findClientByID(id);
  clients[index].lastActivity = timestamp.timestamp();
  refreshClients();
}

//this will clear out the 'clients.dat' file and rewrite it with the client array
//TODO: move this to ClientIO
function refreshClients()
{
    clientIO.removeClients();
    clientIO.addClients(clients);
}

//This will clear out all the clients in memory and the file
function removeClients(){
    clients = [];
    clientIO.removeClients();
}

//Given an ID, it will return the client object
function getClient(id){
    return clients[findClientByID(id)];
}

//this will return all current clients
function getClients(){
    return clients;
}

//Given a username, it will return the index of the object in memory
function findClientByUsername(username)
{
  for(var i = 0; i<clients.length; i++){
    if(clients[i].username == username)
      return i;
  }
  return -1;
}

//Given an id, it will return the index of the object in memory
function findClientByID(id){
    for(var i = 0; i<clients.length; i++){
      if(clients[i].id == id)
        return i;
    }
    return -1;
}

//this is called on startup and puts all clients from 'clients.dat' into memory
function clientsStartup(){
    clients = clientIO.getClients();
}

module.exports.add = addClient;
module.exports.remove = removeClient;
module.exports.getClients = getClients;
module.exports.get = getClient;
module.exports.getByUsername = findClientByUsername;
module.exports.updateActivity = updateActivity;

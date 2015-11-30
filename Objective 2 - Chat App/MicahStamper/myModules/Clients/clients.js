var client = require("./client");
var clientIO = require("./ClientIO");
var clients = [];

clientsStartup();
//this function will create a new client and add it to the array as well as write to file
function addClient(id, username){
    var newClient = new client(id,username);
    clients.push(newClient);
    console.log("logging " + username);
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

function removeClients(){
    clients = [];
    clientIO.removeClients();
}

function getClient(id){
    return clients[findClientByID(id)];
}

function getClients(){
    return clients;
}

function findClientByUsername(username)
{
  for(var i = 0; i<clients.length; i++){
    if(clients[i].username == username)
      return i;
  }
  return -1;
}
function findClientByID(id){
    for(var i = 0; i<clients.length; i++){
      if(clients[i].id == id)
        return i;
    }
    return -1;
}

function clientsStartup(){
    clients = clientIO.getClients();
}

module.exports.add = addClient;
module.exports.remove = removeClient;
module.exports.getClients = getClients;
module.exports.get = getClient;
module.exports.getByUsername = findClientByUsername;

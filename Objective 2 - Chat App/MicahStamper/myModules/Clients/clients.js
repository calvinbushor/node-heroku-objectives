var client = require("./client");
var clients = [];

function addClient(id, username){
    var newClient = new client(id,username);
    clients.push(newClient);
}

function removeClient(id){
    var index = findClientByID(id);
    if(index != -1){
      clients[index].updateActivity();
      clients.splice(index,1);
    }
}

function getClient(id){
    return clients[findClientByID(id)];
}

function getClients(){
    return clients;
}

function findClientByID(id){
    for(var i = 0; i<clients.length; i++){
      if(clients[i].id == id)
        return i;
    }
    return -1;
}

module.exports.add = addClient;
module.exports.remove = removeClient;
module.exports.getClients = getClients;
module.exports.get = getClient;

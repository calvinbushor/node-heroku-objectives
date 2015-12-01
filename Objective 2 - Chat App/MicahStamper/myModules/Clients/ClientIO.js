var fs = require("fs");
var client = require("./client");

//Given the client paramater, it will write this to the clients.dat file
function writeClientToFile(clientToWrite){
    fs.appendFile('clients.dat', JSON.stringify(clientToWrite)+"\n",function (err) {
        if (err) throw err;
    });
}

//Given the paramter of an array of clients, it will write each one to the file
function writeClientsToFile(clientsToWrite){
    for(var i = 0; i<clientsToWrite.length;i++){
      writeClientToFile(clientsToWrite[i]);
    }
}

//This will open the clients.dat file and read all of them and return them as JSON
function readClientsFromFile(){
  try{
      var readIn = fs.readFileSync('clients.dat','utf8');
      var clients = readIn.split("\n");
      for(var i = 0; i<clients.length-1; i++){
        var current = clients[i];
        clients[i] = JSON.parse(current.trim());
      }
      clients.splice(clients.length-1,1);
      return clients;
  } catch(err){
      fs.appendFile('clients.dat','', 'utf8');
      return [];
  }
}

//Given a client object, this will find a particular client and return it
function readClientFromFile(clientToRead){
    var clients = readClientsFromFile();
    for(var i = 0; i<clients.length;i++){
      if(clients[i].id == clientToRead.id)
          return clients[i];

      return -1;
    }
}

//Given an ID, this will remove a client from the current list
function removeClientFromFile(id){
    var clients = readClientsFromFile();
    for(var i = 0; i<clients.length;i++){
      if(clients[i].id == id)
          clients.splice(i,1);
    }
    removeClientsFromFile();
    writeClientsToFile(clients);
}

//This will remove all clients from the file
function removeClientsFromFile(){
    fs.unlinkSync('clients.dat', function(err) {
      if(err)
        console.log("trouble deleting clients file!");
  });
}

module.exports.addClient = writeClientToFile;
module.exports.loadClients = readClientsFromFile;
module.exports.removeClients = removeClientsFromFile;
module.exports.removeClient = removeClientFromFile;
module.exports.addClients = writeClientsToFile;
module.exports.getClients = readClientsFromFile;

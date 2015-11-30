var fs = require("fs");
var client = require("./client");

function writeClientToFile(clientToWrite){
    fs.appendFile('clients.dat', JSON.stringify(clientToWrite)+"\n",function (err) {
        if (err) throw err;
    });
}

function writeClientsToFile(clientsToWrite){
    for(var i = 0; i<clientsToWrite.length;i++){
      writeClientToFile(clientsToWrite[i]);
    }
}

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

function readClientFromFile(clientToRead){
    var clients = readClientsFromFile();
    for(var i = 0; i<clients.length;i++){
      if(clients[i].id == clientToRead.id)
          return clients[i];

      return -1;
    }
}

function removeClientFromFile(id){
    var clients = readClientsFromFile();
    for(var i = 0; i<clients.length;i++){
      if(clients[i].id == id)
          clients.splice(i,1);
    }
    removeClientsFromFile();
    writeClientsToFile(clients);
}

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

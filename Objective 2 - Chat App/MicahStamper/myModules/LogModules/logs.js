var log = require("./log");
var clients = require("../Clients/clients");

var logs = [];

//adds a message to the log memory
function add(messageToLog){
    var newMessage = new log(messageToLog);
    logs.push(newMessage);
}

//returns all logs
function getLogs(){
  return logs;
}

module.exports.add = add;
module.exports.getLogs = getLogs;

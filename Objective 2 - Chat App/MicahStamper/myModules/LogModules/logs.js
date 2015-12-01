var log = require("./log");
var clients = require("../Clients/clients");

var logs = [];

function add(messageToLog){
    var newMessage = new log(messageToLog);
    logs.push(newMessage);
}

function getLogs(){
  return logs;
}

module.exports.add = add;
module.exports.getLogs = getLogs;

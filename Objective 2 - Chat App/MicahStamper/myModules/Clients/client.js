var timestamp = require("../timestamp");
function client(id, username){
  this.id = id;
  this.username = username;
  this.joined = timestamp.timestamp();
  this.lastActivity = timestamp.timestamp();
}

client.prototype.updateActivity = function(){
  this.lastActivity = timestamp.timestamp();
  return this.lastActivity;
}

module.exports = client;

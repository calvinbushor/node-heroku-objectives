var timestamp = require("../timestamp");

//standard constructor class
function client(id, username){
  this.id = id;
  this.username = username;
  this.joined = timestamp.timestamp();
  this.lastActivity = timestamp.timestamp();
}

module.exports = client;

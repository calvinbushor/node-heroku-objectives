var timestamp = require("../timestamp");

//standard constructor class
function log(newMessage){
    this.timestamp = timestamp.timestamp();
    this.name = newMessage.name;
    this.message = newMessage.msg;
    this.type = newMessage.type;
}

//function for outputing
log.prototype.toString = function(){
  return "[" + this.timestamp + "] type: " + this.type + ": " + this.message;
}

module.exports = log;

var fs = require("fs");
function getMessagesSent(){
  try{
    var readIn = fs.readFileSync('/statFiles/messages.dat','utf8');
    return readIn;
  }
  catch(e)
  {
    return 0;
  }
}

function getUsersJoined(){
  try{
    var readIn = fs.readFileSync('/statFiles/users.dat','utf8');
    return readIn;
  }
  catch(e)
  {
    return 0;
  }
}

function getUsernames(){
  try{
    var readIn = fs.readFileSync('/statFiles/usernames.dat','utf8');
    return readIn;
  }
  catch(e)
  {
    return 0;
  }
}

function getStats(){
  var messages = getMessagesSent();
  var users = getUsersJoined();
  var names = getUsernames();
  return {"messagesSent":getMessagesSent(), "usersJoined":getUsersJoined(),"usernames":getUsernames()};
}
module.exports.get = getStats;

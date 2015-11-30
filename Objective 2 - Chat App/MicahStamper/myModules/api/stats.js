var fs = require("fs");
function getMessagesSent(){
  try{
    var readIn =  parseInt(fs.readFileSync('./MyModules/api/statFiles/messageCount.dat','utf8'));
    return readIn;
  }
  catch(e)
  {
    return 0;
  }
}

function getUsersJoined(){
  try{
    var readIn = parseInt(fs.readFileSync('./MyModules/api/statFiles/userCount.dat','utf8'));
    return readIn;
  }
  catch(e)
  {
    return 0;
  }
}

function getUsernames(){
  try{
    var check = fs.readFileSync('./MyModules/api/statFiles/usernames.dat','utf8');
    check = '"usernames": {' + check.substring(0,check.length-2) + '}';
    var readIn = check;
    if(readIn!="")
    {
      return readIn;
    } else{
      return null;
    }
  }
  catch(e)
  {
    return null;
  }
}

function addUsername(username){
  fs.appendFile('./MyModules/api/statFiles/usernames.dat','"' + username + '": "' + username + '", ' ,function (err) {
      if (err) throw err;
  });
  addUser();
}

function addMessage(){
  var readIn;
  try{
      readIn = fs.readFileSync('./MyModules/api/statFiles/messageCount.dat','utf8');
      fs.unlinkSync('./MyModules/api/statFiles/messageCount.dat', function(err) {
        if(err)
          console.log("trouble deleting file!");
        });
        readIn = parseInt(readIn);
  } catch(err){
    readIn = 0;
  }
  readIn++;

  fs.appendFile('./MyModules/api/statFiles/messageCount.dat', readIn,function (err) {
        if (err) throw err;
    });
}

function addUser(){
  var readIn;
  try{
      readIn = fs.readFileSync('./MyModules/api/statFiles/userCount.dat','utf8');
      fs.unlinkSync('./MyModules/api/statFiles/userCount.dat', function(err) {
        if(err)
          console.log("trouble deleting file!");
        });
        readIn = parseInt(readIn);
  } catch(err){
    readIn = 0;
  }
  readIn++;

  fs.appendFile('./MyModules/api/statFiles/userCount.dat', readIn,function (err) {
        if (err) throw err;
    });
}

function getStats(){
  console.log('{"messagesSent":' + getMessagesSent() + ', "usersJoined":' + getUsersJoined() + ',' + getUsernames() + '}');
  return JSON.parse('{"messagesSent":' + getMessagesSent() + ', "usersJoined":' + getUsersJoined() + ',' + getUsernames() + '}');
}
module.exports.get = getStats;
module.exports.addUsername = addUsername;
module.exports.addMessage = addMessage;

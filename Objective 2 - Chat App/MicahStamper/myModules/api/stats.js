var fs = require("fs");
var clients = require("../Clients/clients");

//this will read the messageCount file and return the number of messages sent
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

//this will read the userCount.dat file and return the number of users
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

//this will read the usernames.dat file and get all usernames
function getUsernames(){
  try{
    var check = fs.readFileSync('./MyModules/api/statFiles/usernames.dat','utf8');
    check = '"users": [' + check.substring(0,check.length-2) + ']';
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

//this will add a user to the usernames.dat file
function addUser(user){
  fs.appendFile('./MyModules/api/statFiles/usernames.dat',JSON.stringify(user) + ", ",function (err) {
      if (err) throw err;
  });
  addUserCount();
}

//this will increment the value in the messageCount.dat file
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

//this will increment the value in the userCount.dat file
function addUserCount(){
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

//this will return a JSON of all attributes on the api
function getStats(){
  console.log('{"messagesSent":' + getMessagesSent() + ', "usersJoined":' + getUsersJoined() + ',' + getUsernames() + '}');
  return JSON.parse('{"messagesSent":' + getMessagesSent() + ', "usersJoined":' + getUsersJoined() + ',' + getUsernames() + '}');
}
module.exports.get = getStats;
module.exports.addUser = addUser;
module.exports.addMessage = addMessage;

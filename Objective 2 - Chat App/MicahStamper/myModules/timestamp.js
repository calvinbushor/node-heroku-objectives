//little module for a formatted timestamp
function timestamp(){
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
module.exports.timestamp = timestamp;

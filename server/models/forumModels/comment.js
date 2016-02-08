var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var commentSchema = new Schema({
    
    user: String,
    threadID: String,
    message: String 
})

module.exports = mongoose.model('messages', commentSchema);
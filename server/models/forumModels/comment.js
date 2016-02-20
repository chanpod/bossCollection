var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var commentSchema = new Schema({
    
    user: String,
    threadID: String,
    message: String,
    dateCreated: Date,
    dateEdited: Date 
})

module.exports = mongoose.model('comments', commentSchema);
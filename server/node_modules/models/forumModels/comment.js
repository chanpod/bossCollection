var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var commentSchema = new Schema({
    
    user: String,
    threadID: String,
    message: String,
    dateCreated: Date,
    dateEdited: Date,
    sticky: Boolean
})

module.exports = mongoose.model('comments', commentSchema);
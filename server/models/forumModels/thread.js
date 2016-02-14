var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var threadSchema = new Schema({
    
    title: String,
    user: String,
    comments: Array,
    message: String,
    forumID: String
})

module.exports = mongoose.model('threads', threadSchema);
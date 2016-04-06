var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var threadSchema = new Schema({
    
    title: String,
    user: String,
    comments: Array,
    message: String,
    forumID: String,
    commentCount:Number,
    favorite: Boolean,
    dateCreated: Date,
    sticky: Boolean
})

module.exports = mongoose.model('threads', threadSchema);
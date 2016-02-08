var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var forumSchema = new Schema({
    
    name: String,
    threads: Array,
     
})

module.exports = mongoose.model('forums', forumSchema);
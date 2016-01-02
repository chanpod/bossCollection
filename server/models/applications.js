var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    user: String, //gathered From session
    character: Object,
    realm: Object,
    previousGuild: String,
    itemLevel: String,
    role: String,
    comments: String,
    dateApplied: Date    
})

module.exports = mongoose.model('applications', applicationSchema);
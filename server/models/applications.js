var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    user: String, //gathered From session
    battleTag: String,
    character: Object,
    realm: Object,
    previousGuild: String,
    itemLevel: String,
    role: String,
    comments: String,
    desiredRole: String,
    dateApplied: Date,
    guild: String
})

module.exports = mongoose.model('applications', applicationSchema);
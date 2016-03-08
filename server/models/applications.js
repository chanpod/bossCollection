var mongoose = require('mongoose');


var Schema = mongoose.Schema;

/**
 * status: Applied, Rejected, Approved
 */

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
    guild: String,
    status: String
})

module.exports = mongoose.model('applications', applicationSchema);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var absenceSchema = new Schema({
    user: String, //gathered From session
    date: Object,
    reason: String,
    type: String,
    guild: String
})

module.exports = mongoose.model('absence', absenceSchema);
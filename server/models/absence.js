var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var absenceSchema = new Schema({
    user: String, //gathered From session
    date: Object,
    reason: String,
    absent: Boolean,
    late: Boolean
})

module.exports = mongoose.model('absence', absenceSchema);
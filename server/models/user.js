var mongoose = require('mongoose');
var mongooseDB  = mongoose.createConnection("mongodb://localhost/bosscollection");

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    battleTag: String,
    characters: Array
})
 
module.exports = mongoose.model('accounts', userSchema);

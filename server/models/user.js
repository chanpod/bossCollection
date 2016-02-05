var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    battleTag: String,
    characters: Array,
    guild: Object
})
 
module.exports = mongoose.model('accounts', UserSchema);

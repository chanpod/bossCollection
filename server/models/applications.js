var mongoose = require('mongoose');
var mongooseDB  = mongoose.connect("mongodb://localhost/bosscollection");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    user: String, //gathered From session
    character: String,
    currentRealm: String,
    
})

var UserModel = mongoose.model('accounts', UserSchema);
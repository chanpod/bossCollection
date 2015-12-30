var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    name: String,
    password: String,
    email: String,
    battleTag: String,
    characters: []
});

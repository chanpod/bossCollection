var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var GuildSchema = new Schema({
    name: String,
    members: [
        {
            user: String,
            rank: Number
        }
    ]
})
 
module.exports = mongoose.model('guilds', GuildSchema);

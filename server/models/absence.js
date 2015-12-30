var mongoose = require('mongoose');
 
module.exports = mongoose.model('absence',{
    "user": "",
    "date": "",
    "reason": "",
    "absent": false,
    "late": false    
});

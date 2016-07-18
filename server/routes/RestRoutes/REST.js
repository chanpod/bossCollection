var express = require('express');
var router = express.Router();

var authentication = require('./account/routes.js');
var forums = require('./forums/routes.js');
var guild = require('./guild/routes.js');
var util = require('utility');

router.use(function(req, res, next) {
    
    var errMessage = "You must be logged in and a part of a guild to use this";
    var allowedUrl = "/guild/guildHomepage";
    var loginUrl = "/login";

    if (!req.url.match(allowedUrl) && req.method != "GET" && !req.url.match(loginUrl)) {

        try{

            if (req.session.user.guild.members[0].approved == true) {
                next();
            }
            else {

                throw new Error("Unauthorized");
            }
        }
        catch(err){
            res.status(400).send(util.handleErrors(err));
        }
    }
    else {

        next();
    }
    
})

router.use('/api/account', authentication);
router.use('/api/forum', forums);
router.use('/api/guild', guild);

module.exports = router;
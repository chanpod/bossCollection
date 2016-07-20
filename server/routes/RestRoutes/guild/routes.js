var express = require('express');
var router = express.Router();

var absence = require('./components/absence/absenceRoutes.js');
var applications = require('./components/applications/applicationsRoutes.js');
var guildManager = require('./components/guild/guildManagerRoutes.js');

var util = require('utility');

router.use(function (req, res, next) {

    var errMessage = "You must be logged in and a part of a guild to use this";
    var allowedUrl = "/guild/guildHomepage";
    var loginUrl = "/login";
    var logoutUrl = "/logout";
    var joinGuild = "/guild/addMember"

    next();
})

router.use('/absence', absence);
router.use('/applications', applications);
router.use('/guild', guildManager);

module.exports = router;
var express = require('express');
var router = express.Router();

var authentication = require('./account/routes.js');
var forums = require('./forums/routes.js');
var guild = require('./guild/routes.js');
var oauthService = require('./oauthServiceRoutes.js');
var util = require('utility');

router.use(function(req, res, next) {
    
   next();
    
})

router.use('/api/account', authentication);
router.use('/api/forum', forums);
router.use('/api/guild', guild);
router.use('/api/oauth', oauthService);

module.exports = router;
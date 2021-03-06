var express = require('express');
var router = express.Router();

var authentication = require('./account/routes.js');
var forums = require('./forums/routes.js');
var guild = require('./guild/routes.js');
var util = require('utility');

router.use(function(req, res, next) {
    
   next();
    
})

router.use('/api/account', authentication);
router.use('/api/forum', forums);
router.use('/api/guild', guild);

module.exports = router;
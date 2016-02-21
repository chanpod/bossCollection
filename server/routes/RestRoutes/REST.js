var express = require('express');
var path = require('path');
var application = require('./applications');
var absence = require('./absence');
var guilds = require('./guild-manager');
var router = express.Router();
var q = require('q');
var bossStrats = require('./bossStratsREST');
var app = express();




router.use(function(req,res, next){
  
  next();
})

router.use(application);
router.use(absence);
router.use(guilds);

//Playing around with REST routes
router.route('/test')
  .post(function(req, res){
    
    console.log("Route is working as intended");
    
    
    res.json({message: "Here's a response for a POST!"});
  })
  .get(function(req, res){
    console.log("Getting some data");
    res.json({message: "heres your response for a GET"});
  })
  
//router.use(authentication);
//router.use(bossStrats);
  
  
module.exports = router;
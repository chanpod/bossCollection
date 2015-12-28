var express = require('express');
var path = require('path');
var mongo = require('../mongoFunctions');
var router = express.Router();
var q = require('q');
var bossStrats = require('./bossStratsREST');
var app = express();




router.use(function(req,res, next){
  console.log("It's working?");
  next();
})

//Playing around with REST routes
router.route('/test')
  .post(function(req, res){
    
    console.log("Route is working as intended");
    console.log(req.body);
    
    res.json({message: "Here's a response for a POST!"});
  })
  .get(function(req, res){
    console.log("Getting some data");
    res.json({message: "heres your response for a GET"});
  })
  
//router.use(authentication);
//router.use(bossStrats);
  
  
module.exports = router;
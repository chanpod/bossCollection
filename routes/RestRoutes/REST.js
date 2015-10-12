var express = require('express');
var path = require('path');
var mongo = require(path.dirname('/routes/mongoFunctions.js'));
var router = express.Router();
var q = require('q');
var bossStrats = require('./bossStratsREST.js');

router.use(function(req,res, next){
  console.log("It's working?");
  next();
})

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
  

router.use(bossStrats);
  
  
module.exports = router;
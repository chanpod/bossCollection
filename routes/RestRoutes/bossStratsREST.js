var express = require('express');
var mongo = require('../mongoFunctions.js');
var router = express.Router();
var q = require('q');

router.route('/bossStrats')
  .put(function(req, res){
    
    var newStrats = JSON.parse(newStrats);    
    
    mongo.saveRaidBossInfo(newStrats.raidData).then(function (result) {
      console.log(result);
      res.json({result: "Hello world"});
    },
      function (err) {

        console.log(err);
        res.json(err);
      })
  })
  .post(function(req, res){
    
    
    console.log("Getting bossStrats for: ");
    console.log(req.body);
    
    var query = req.body;
    
    mongo.getRaidBossInfo(query).then(function (data) {      
      
      console.log("Data from mongo returning");
      
      //socket.emit("bossInfoData", data);     
      
      if(data){
        res.json({result: data});
      } 
      else{
        res.json({result: "No results found"});
      }
      
    },
      function (err) {
        
        console.log(err);
        res.json({errMessage: "Something broke",
                  errNum: 500
        });
      });
  })
  
  
module.exports = router;
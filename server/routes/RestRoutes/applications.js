var express = require('express');
var router = express.Router();
var q = require('q');
var ApplicationModel = require('../../models/applications.js');
var moment = require('moment');

router.route('/applicationSubmission')  
  .post(function(req, res){
    
    var newApplication = new ApplicationModel(req.body.newApplicant);
    var dateApplied = moment();
    
    newApplication.user = req.session.user.name;    
    newApplication.battleTag = req.session.user.battleTag;
    newApplication.dateApplied = dateApplied;
    
    newApplication.save().then(function(result){
        
        res.status(200).send(result);
    },
    function(err){
        
        res.status(400).send(err);
    })
    
  })
  
router.route('/getApplications')
    .get(function(req, res){
        console.log("Getting applications...");
        ApplicationModel.find({})
            .then(function(applications){
                
                res.status(200).send({"applications" : applications});
            },
            function(err){
                res.status(400).send(err);
            })
    })
  
module.exports = router;
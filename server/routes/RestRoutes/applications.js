var express = require('express');
var router = express.Router();
var q = require('q');
var ApplicationModel = require('../../models/applications.js');
var EmailDispatcher = require('../../auth/modules/email-dispatcher');
var UserModel = require('../../models/user.js');
var moment = require('moment');

var statuses = {
    approved: "Approved",
    rejected: "Rejected",
    applied: "Applied"
}

router.route('/applicationSubmission')  
  .post(function(req, res){
    
    var newApplication = new ApplicationModel(req.body.newApplicant);
    var dateApplied = moment();
    
    newApplication.user = req.session.user.name;    
    newApplication.battleTag = req.session.user.battleTag;
    newApplication.dateApplied = dateApplied;
    newApplication.guild = req.body.newApplicant.guildName
    newApplication.status = statuses.applied
    
    newApplication.save().then(function(result){
        
        res.status(200).send(result);
    },
    function(err){
        
        res.status(400).send(err);
    })
    
  })

router.route('/approveApplication')
    .post(function(req, res){
        
        var application = req.body.application;
        
        
        
        ApplicationModel.findOne({_id : application._id})
            .then(function(applicationModel){
                
                if(applicationModel.status != statuses.approved){
                    
                    applicationModel.status = statuses.approved;
                
                    applicationModel.save(function() {

                        approveApplication(application);
                        res.status(200).send({ application: application });
                    })
                }
            })
    })
    
    
router.route('/rejectApplication')
    .post(function(req, res){
        
        var application = req.body.application;
        
        
        
        ApplicationModel.findOne({_id : application._id})
            .then(function(applicationModel){
                
                applicationModel.status = statuses.rejected;
                applicationModel.save(function(){
                    
                    rejectApplication(application);
                    res.status(200).send({application: application});    
                })
                
            })
    })
    
    
router.route('/getApplications')
    .get(function(req, res){
        console.log("Getting applications...");
        ApplicationModel.find({guild: req.session.user.guild.name})
            .then(function(applications){
                
                res.status(200).send({"applications" : applications});
            },
            function(err){
                res.status(400).send(err);
            })
    })
 
 function approveApplication(application){
     
     var message = "You're application has been approved for " + application.guild + ". Someone from the guild will be in touch with you shortly to discuss the details of your first trial night.";
     var subject = "Application approved";
     
     UserModel.findOne({name: application.user})
        .then(function(userAccount){
            
            EmailDispatcher.dispatchCustomEmail(message, subject, userAccount);
        })
 }
 
 function rejectApplication(application){
     
     var message = "You're application has been denied for " + application.guild + ". Good luck next time.";
     var subject = "Application Denied";
     
     UserModel.findOne({name: application.user})
        .then(function(userAccount){
            
            EmailDispatcher.dispatchCustomEmail(message, subject, userAccount);
        })
 }
 
module.exports = router;
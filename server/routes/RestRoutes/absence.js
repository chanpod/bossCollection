var express = require('express');
var router = express.Router();
var q = require('q');
var AbsenceModel = require('../../models/absence.js');
var moment = require('moment');

/**
{
    "user": "",
    "date": "",
    "reason": "",
    "absent": false,
    "late": false    
}
 */

router.route('/absence')  
  .post(function(req, res){
    
    var newAbsence = new AbsenceModel(req.body.newApplicant);
    var date = moment(req.body.date);
    
    date.millisecond(0);
    date.seconds(0);
    date.minutes(0);
    date.hour(0);
    
    newAbsence.user = req.session.user.name;    
    newAbsence.date = date.toISOString();
    newAbsence.reason = req.body.reason;
    newAbsence.absent = req.body.absent;
    newAbsence.late = req.body.late;
    
    newAbsence.save().then(function(result){
        
        res.status(200).send(result);
    },
    function(err){
        
        res.status(400).send(err);
    })
    
  })
  
router.route('/absence')
    .get(function(req, res){
        console.log("Getting absences...");
        
        var date = moment();
        date.millisecond(0);
        date.seconds(0);
        date.minutes(0);
        date.hours(0);
        
        console.log(date.toISOString());
        
        AbsenceModel.find({
            date:{
                $gte:date.toISOString()
            }
        })
            .then(function(absences){
                
                res.status(200).send({"absences" : absences});
            },
            function(err){
                res.status(400).send(err);
            })
    })
  
module.exports = router;
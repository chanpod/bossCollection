var express = require('express');
var router = express.Router();
var q = require('q');
var AbsenceModel = require('../../models/absence.js');
var moment = require('moment');
var util = require('../../utility');

/**
{
    "user": "",
    "date": "",
    "reason": "",
    "absent": false,
    "late": false    
}
 */

router.use(function(req,res, next){
    
  var errMessage = "You must be logged in and a part of a guild to use this";
  
  if(req.session.user){
      
      if (req.session.user.guild) {
          next();
       }
       else{
           res.status(400).send(util.handleErrors(errMessage));
       }
  }
  
  else{
      res.status(400).send(util.handleErrors(errMessage));
  }
  
})

router.route('/absence')  
  .post(function(req, res){
      
    console.log("Saving new asbence...")
    
    var newAbsence = new AbsenceModel(req.body.newApplicant);
    var date = standardiseTime(req.body.date);
    
    newAbsence.user = req.body.user || req.session.user.name;    
    newAbsence.date = date.toISOString();
    newAbsence.type = req.body.type;    
    newAbsence.late = req.body.late;
    newAbsence.reason = req.body.reason;
    newAbsence.guild = req.session.user.guild.name;
    
    newAbsence.save().then(function(result){
        
        res.status(200).send(result);
    },
    function(err){
        
        res.status(400).send(util.handleErrors(err));
    })
    
  })
  
router.route('/absence')    
    .get(function(req, res){
        console.log("Getting absences...");
        
        var date;
        
        date = standardiseTime(moment());
    
        getAbsences(date, req, res);
    })

router.route('/deleteAbsence')
    .post(function(req, res){
        
        
        var absenceId = req.body.absence.id || req.body.absence._id;


        AbsenceModel.findOne({ "_id": absenceId })
            .then(function (absence) {

                return absence.remove()
                
                

            }, function (err) {

                res.status(400).send(util.handleErrors(err));
            })
            .then(function(response){
                res.status(200).send({ "absences": response });
            })
    })
    
router.route('/saveAbsence')
    .post(function(req, res){
        
        var absenceId = req.body.absence.id || req.body.absence._id;
        var query = { "_id": absenceId };

        AbsenceModel.findOneAndUpdate(query, req.body.absence)
            .then(function (response) {

                res.status(200).send({ "absences": response });
            }, function (err) {
                
                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/absenceHistory')
    .post(function(req, res){
        
        var numOfWeeks = req.body.weeks;
        var numOfDaysHistory = numOfWeeks * 7;
        var startingDate = standardiseTime(req.body.date);
        
        if(startingDate == undefined){
            startingDate = standardiseTime(moment());
        }
         
        var currentDayOfYear = moment().dayOfYear();
        
        var endDate = moment().dayOfYear(currentDayOfYear - numOfDaysHistory);
        
        AbsenceModel.find({
            $and: [
                {date: {
                    $lte: startingDate.toISOString()
                }},
                {date: {
                    $gte: endDate.toISOString()
                }},
                {guild: req.session.user.guild.name}
            ]
        })
        .then(function (absences) {

            res.status(200).send({ "absences": absences });
        },
            function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/absenceByDate')    
    .post(function(req, res){
        console.log("Getting absences by date...");
        
        var date;
        
        date = standardiseTime(req.body.date);

        AbsenceModel.find({
            date: date.toISOString(),
            guild: req.session.user.guild.name
        })
            .then(function (absences) {

                res.status(200).send({ "absences": absences });
            },
                function (err) {
                    res.status(400).send(util.handleErrors(err));
                })
    })

function standardiseTime(date){
    
    console.log(date)
    
    date = moment(date);
    
    console.log(date);
    
    console.log("ISO String");
    console.log(date.toISOString());

    
    date.millisecond(0);
    date.seconds(0);
    date.minutes(0);
    date.hours(0);
    
    return date;
}

function getAbsences(date, req, res){
    
    AbsenceModel.find({
        date: {
            $gte: date.toISOString()
        },
        guild: req.session.user.guild.name
    })
        .then(function (absences) {

            res.status(200).send({ "absences": absences });
        },
        function (err) {
            res.status(400).send(util.handleErrors(err));
        })
}
  
module.exports = router;
var q = require('q');
var AbsenceModel = require('models/absence.js');
var moment = require('moment');
var util = require('utility');



function saveAbsence(req, res){
    
    var defer = q.defer();
      
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
        
        defer.resolve(result);
    },
    function(err){
        
        defer.reject(err);
    })
    
    return defer.promise;
  }
  
function getAbsence(req, res) {
    
    var defer = q.defer();
    
    console.log("Getting absences...");

    var date;

    date = standardiseTime(moment());

    getAbsences(date, req, res)
        .then(function(response){
            defer.resolve(response);
        })
        .fail(function(err){
            defer.reject(err);
        })
    
    return defer.promise;
}

function deleteAbsence(req, res) {

    var defer = q.defer();
    
    var absenceId = req.body.absence.id || req.body.absence._id;

    AbsenceModel.findOne({ "_id": absenceId })
        .then(function(absence) {

            return absence.remove()



        }, function(err) {

            defer.reject(err);
        })
        .then(function(response) {
            defer.resolve({ "absences": response });
        })
        
    return defer.promise;
}
    
function updateAbsence(req, res) {

    var defer = q.defer();
    
    var absenceId = req.body.absence.id || req.body.absence._id;
    var query = { "_id": absenceId };

    AbsenceModel.findOneAndUpdate(query, req.body.absence)
        .then(function(response) {

            defer.resolve({ "absences": response });
        }, function(err) {

            defer.reject(err);
        })
        
    return defer.promise;
}

function getAbsenceHistory(req, res){
        
    var defer = q.defer();
    
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

        defer.resolve({ "absences": absences });
    },
        function (err) {
            defer.reject(err);
        })
        
    return defer.promise;
}

function getAbsenceByDate(req, res) {

    var defer = q.defer();
    console.log("Getting absences by date...");

    var date;

    date = standardiseTime(req.body.date);

    AbsenceModel.find({
        date: date.toISOString(),
        guild: req.session.user.guild.name
    })
        .then(function(absences) {

            defer.resolve({ "absences": absences });
        },
        function(err) {
            defer.reject(err);
        })
        
    return defer.promise;
}

  
module.exports = {
    saveAbsence: saveAbsence,
    getAbsence: getAbsence,
    deleteAbsence: deleteAbsence,
    updateAbsence: updateAbsence,
    getAbsenceHistory: getAbsenceHistory,
    getAbsenceByDate: getAbsenceByDate
};

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
    
    var defer = q.defer();
    
    AbsenceModel.find({
        date: {
            $gte: date.toISOString()
        },
        guild: req.session.user.guild.name
    })
        .then(function (absences) {

            defer.resolve({ "absences": absences });
        },
        function (err) {
            defer.reject(err);
        })
        
    return defer.promise;
}
var express = require('express');

var q = require('q');
var ApplicationModel = require('models/applications.js');
var EmailDispatcher = require('../../../account/modules/email-dispatcher');
var UserModel = require('models/user.js');
var moment = require('moment');
var util = require('utility');

var statuses = {
    approved: "Approved",
    rejected: "Rejected",
    applied: "Applied"
}

function submitApplication(req, res) {

    var defer = q.defer();

    var newApplication = new ApplicationModel(req.body.newApplicant);
    var dateApplied = moment();

    newApplication.user = req.session.user.name;
    newApplication.battleTag = req.session.user.battleTag;
    newApplication.dateApplied = dateApplied;
    newApplication.guild = req.body.newApplicant.guildName
    newApplication.status = statuses.applied

    newApplication.save().then(function (result) {

        defer.resolve(result);
    },
        function (err) {

            defer.reject(util.handleErrors(err));
        })

    return defer.promise;

}

function approveApplication(req, res) {

    var defer = q.defer();

    var application = req.body.application;

    ApplicationModel.findOne({ _id: application._id })
        .then(function (applicationModel) {

            if (applicationModel.status != statuses.approved) {

                applicationModel.status = statuses.approved;

                applicationModel.save(function () {

                    approveApplicationEmail(application);
                    defer.resolve({ application: application });
                })
            }
        }, (err) => {
            defer.reject(util.handleErrors(err));
        })

    return defer.promise;
}


function rejectApplication(req, res) {

    var defer = q.defer();

    var application = req.body.application;

    ApplicationModel.findOne({ _id: application._id })
        .then(function (applicationModel) {

            applicationModel.status = statuses.rejected;
            applicationModel.save(function () {

                rejectApplicationEmail(application);
                defer.resolve({ application: application });
            })

        }, (err) => {
            defer.reject(util.handleErrors(err));
        })

    return defer.promise;
}

function deleteApplication(req, res) {

    var defer = q.defer();

    var appID = req.body.appID;

    try {

        ApplicationModel.findOne({ _id: appID })
            .then(function (applicationModel) {


                applicationModel.remove(function () {

                    defer.resolve(true);
                })

            }, (err) => {
                defer.reject(util.handleErrors(err));
            })
    }
    catch (err) {
        defer.reject(util.handleErrors(err));
    }

    return defer.promise;
}

function getUserApplications(req, res) {

    var defer = q.defer();
    console.log("Getting applications..."); 


    var user = req.params.user;

    var date = moment();

    if (req.params.startDate) {
        date = moment(req.params.startDate);
    }
    else {

        date.month((date.month() - 2))
    }

    ApplicationModel.find({user: user, dateApplied: {
            $gte: date.toISOString()
        }})
        .then(function (applications) {

            defer.resolve({ "applications": applications });
        },
        function (err) {
            
            defer.reject(util.handleErrors(err));
        })

    return defer.promise;
}

function getApplications(req, res) {

    var defer = q.defer();
    console.log("Getting applications...");


    var date = moment();

    if (req.params.startDate) {
        date = moment(req.params.startDate);
    }
    else {

        date.month((date.month() - 2))
    }

    ApplicationModel.find({
        guild: req.session.user.guild.name, dateApplied: {
            $gte: date.toISOString()
        }
    })
        .then(function (applications) {

            defer.resolve({ "applications": applications });
        },
        function (err) {
            defer.reject(err);
        })

    return defer.promise;
}



module.exports = {
    getApplications: getApplications,
    rejectApplication: rejectApplication,
    approveApplication: approveApplication,
    submitApplication: submitApplication,
    getUserApplications:getUserApplications,
    deleteApplication:deleteApplication
};

function approveApplicationEmail(application) {

    var message = "You're application has been approved for " + application.guild + ". Someone from the guild will be in touch with you shortly to discuss the details of your first trial night.";
    var subject = "Application approved";

    UserModel.findOne({ name: application.user })
        .then(function (userAccount) {

            EmailDispatcher.dispatchCustomEmail(message, subject, userAccount);
        })
}

function rejectApplicationEmail(application) {

    var message = "You're application has been denied for " + application.guild + ". Good luck next time.";
    var subject = "Application Denied";

    UserModel.findOne({ name: application.user })
        .then(function (userAccount) {

            EmailDispatcher.dispatchCustomEmail(message, subject, userAccount);
        })
}


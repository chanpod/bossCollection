var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');
var ranks = [1, 2, 3, 4];
var util = require('utility');

var RecruitmentModel = require('models/recruitment.js');

const RECRUITMENT = "recruitment";

function getRecruitment(req, res) {

    var defer = q.defer();

    let guildName = req.params.guildName;

    RecruitmentModel.findOne({ guild: guildName })
        .then(function (recruitment) {

            if (recruitment == undefined) {

                createRecruitment(guildName)
                    .then(recruitment => {

                        defer.resolve({ recruitment: recruitment });
                    })
                    .catch(err => {
                        
                        defer.reject(util.handleError(err));
                    })
            }
            else {

                defer.resolve({ recruitment: recruitment });
            }
        }, function (err) {

            defer.reject(util.handleError(err));
        })

    return defer.promise;
}

function updateRecruitment(req, res) {

    var defer = q.defer();

    let recruitmentID = req.body.recruitment._id;
    let recruitmentObject = req.body.recruitment;

    RecruitmentModel.findOneAndUpdate({_id: recruitmentID}, recruitmentObject)
        .then(function (recruitment) {

            defer.resolve(recruitmentObject);
        }, function (err) {

            defer.reject(util.handleError(err));
        })

    return defer.promise;

}

function createRecruitment(guildName) {

    var defer = q.defer();

    var newRecruitment = new RecruitmentModel();

    newRecruitment.recruitmentNeeds = [];
    newRecruitment.guild = guildName;

    newRecruitment.save().then(function (result) {

        defer.resolve(result);
    },
        function (err) {

            defer.reject(util.handleErrors(err));
        })

    return defer.promise;
}

var recruitment = {
    updateRecruitment: updateRecruitment,
    createRecruitment: createRecruitment,
    getRecruitment: getRecruitment,
}

module.exports = recruitment;
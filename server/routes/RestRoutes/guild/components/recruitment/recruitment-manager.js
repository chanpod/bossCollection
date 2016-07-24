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

            defer.resolve({ RECRUITMENT: recruitment });
        }, function (err) {

            defer.reject(util.handleError(err));
        })

    return defer.promise;
}

function updateRecruitment(req, res) {

    var defer = q.defer();

    let recruitmentID = req.body.recruitment._id;

    RecruitmentModel.findOneAndUpdate({_id: recruitmentID})
        .then(function(recruitment) {

            defer.resolve({ RECRUITMENT: recruitment });
        }, function(err) {

            defer.reject(util.handleError(err));
        })

    return defer.promise;

}

function createRecruitment(guildName){

}

var recruitment = {
    updateRecruitment: updateRecruitment,
    createRecruitment:createRecruitment
}

module.exports = recruitment;
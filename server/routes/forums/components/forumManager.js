var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');

var util = require('../../../utility');
var ForumdModel = require('../../../models/forumModels/forum.js');

function createForum(req, res){
    
    var newForum = new ForumdModel();
    
    var name = req.body.forum.name;
    var categoryId = req.body.forum.categoryId;
    var threads = [];
    
    newForum.name = name;
    newForum.categoryId = categoryId;
    newForum.threads = threads;
    
    newForum.save(function(forum){
        
        res.status(200).send({forum: forum});
    }, function(err){
        
        res.status(400).send(util.handleErrors(err));    
    })
    
}

function getForums(categoryId){
    
    var defer = q.defer();
    
    ForumdModel.find({"categoryId": categoryId})
        .then(function(response){
            
            defer.resolve(response);
        }, function(err){
            
            defer.reject(err);
        })
        
    return defer.promise;
}







module.exports = {
    createForum:createForum,
    getForums:getForums
}
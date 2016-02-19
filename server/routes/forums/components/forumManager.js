var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');

var ThreadManager = require('./threadManager');

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

/**
 *  get associated Threads
 *  delete threads
 *  detele forum   
 */
function deleteForum(req, res){
    
    var defer = q.defer();
    var forum = req.body.forum;
    var forumId = forum.id || forum._id;
    
    ThreadManager.getThreads(forumId)
        .then(function(threads){
            
            _(threads.threads).forEach(function(someThread, index){
                
                req.body.thread = someThread;
                ThreadManager.deleteThread(req, res);
            })
            
            ForumdModel.findOne({ "_id": forumId })
                .then(function (forum) {

                    forum.remove();
                    defer.resolve({response: true});
                })
                
        }, function(err){
            
            defer.reject(err);
        })
        .then(function(){
            
        })
    
    return defer.promise;
}

function editForum(req, res){
    
    var defer = q.defer();
    var query = { "_id" : req.body.forum._id};
    
    ForumdModel.findOneAndUpdate(query, req.body.forum)
        .then(function(response){
            
            defer.resolve(response);
        },function(err){
            defer.reject(err);
        })
        
    
    return defer.promise;
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
    getForums:getForums,
    deleteForum:deleteForum,
    editForum:editForum
}
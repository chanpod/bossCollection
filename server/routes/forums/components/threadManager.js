var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');

var MessageManager = require('./MessageManager');

var util = require('../../../utility');
var ThreadModel = require('../../../models/forumModels/thread.js');

function createThread(req, res){
    
    var defer = q.defer();
    
    var newThread = new ThreadModel();
    
    var title = req.body.thread.name;
    var forumID = req.body.thread.forumId;
    var comments = [];
    var message = req.body.thread.message;
    var user = req.session.user.name;
    
    newThread.title = title;
    newThread.user = user;
    newThread.comments = comments;
    newThread.message = message;
    
    newThread.forumID =  forumID;
    
    newThread.save().then(function(response){
        
        defer.resolve(response);
    }, function(err){
        defer.reject(util.handleErrors(err));
    })
    
    return defer.promise;
}

/**
 *  get associated Comments
 *  delete Comments
 *  detele Thread   
 */
function deleteThread(req, res){
    
    var defer = q.defer();
    var thread = req.body.thread;
    var threadId = thread.id || thread._id;
    
    MessageManager.getComments(threadId)
        .then(function(comments){
            
            _(comments.comments).forEach(function(comment){
                
                req.body.comment = comment;
                MessageManager.deleteComment(req, res);
            })
            
            ThreadModel.findOne({"_id": threadId})
                .then(function(thread){
                    
                    thread.remove()
                        .then(function(response){
                            defer.resolve();        
                        })
                      
                })
                
        }, function(err){
            
            defer.reject(err);
        })
        
    return defer.promise;
}

function getThreads(forumId){
    
    var defer = q.defer();
    
    ThreadModel.find({forumID: forumId})
        .then(function(threads){
            
            defer.resolve({threads: threads});
        })
        
    return defer.promise;
}

function editThread(req, res){
    
    var defer = q.defer();
    var query = { "_id" : req.body.thread._id};
    
    ThreadModel.findOneAndUpdate(query, req.body.thread)
        .then(function(response){
            
            defer.resolve(response);
        },function(err){
            defer.reject(err);
        })
        
    
    return defer.promise;
}




module.exports = {
    createThread:createThread,
    getThreads:getThreads,
    deleteThread:deleteThread,
    editThread:editThread
}
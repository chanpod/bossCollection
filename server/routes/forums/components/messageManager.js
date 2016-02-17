var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');

var util = require('../../../utility');
var commentModel = require('../../../models/forumModels/comment.js');

function createComment(req, res){
    
    var defer = q.defer();
    
    var newComment = new commentModel();
    
    
    var threadId = req.body.comment.threadId;
    var message = req.body.comment.message;
    var user = req.session.user.name;
    
    
    newComment.user = user;
    newComment.message = message;
    newComment.threadID =  threadId;
    
    newComment.save().then(function(response){
        
        defer.resolve({comment: response});
    }, function(err){
        defer.reject(util.handleErrors(err));
    })
    
    return defer.promise;
}

function deleteComment(req, res) {

    var defer = q.defer();
    var comment = req.body.comment;
    var commentId = comment.id || comment._id;

    commentModel.findOne({ "_id": commentId })
        .then(function (comment) {

            comment.remove();
            defer.resolve();
            
        }, function(err){
            
            defer.reject(err);
        })

    return defer.promise;
}

function getComments(threadId){
    
    var defer = q.defer();
    
    commentModel.find({threadID: threadId})
        .then(function(comments){
            
            defer.resolve({comments: comments});
        })
        
    return defer.promise;
}



module.exports = {
    createComment:createComment,
    getComments:getComments,
    deleteComment:deleteComment
}
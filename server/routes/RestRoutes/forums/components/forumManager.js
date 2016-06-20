var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');


var ThreadManager = require('./threadManager');

var util = require('utility');
var ForumdModel = require('models/forumModels/forum.js');

function createForum(req, res){

    var CategoryManager = require('./categoryManager');    
    var newForum = new ForumdModel();
    
    var name = req.body.forum.name;
    var categoryId = req.body.forum.categoryId;
    var threads = [];

    newForum.name = name;
    newForum.categoryId = categoryId;
    newForum.threads = threads;

    CategoryManager.getCategoryPermissions(categoryId)
        .then(result => {

            newForum.permissions = result;
            newForum.save(function (forum) {

                res.status(200).send({ forum: forum });
            }, function (err) {

                res.status(400).send(util.handleErrors(err));
            })
        }, (err) => {

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
    var forumId = req.body.forum._id 
    var query = { "_id" : forumId};
    var forumPermissions = req.body.forum.permissions;

    ForumdModel.findOneAndUpdate(query, req.body.forum)
        .then(function (response) {

            ThreadManager.getThreads(forumId)
                .then(function (threads) {

                    _(threads.threads).forEach(function (someThread, index) {

                        someThread.permissions = forumPermissions;
                        req.body.thread = someThread;
                        
                        ThreadManager.editThread(req, res);
                    })

                }, function (err) {

                    defer.reject(err);
                })

        
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



function getForumPermissions(forumId){

    var defer = q.defer();

    ForumdModel.findOne({ "_id": forumId })
        .then((forum) => {

            defer.resolve(forum.permissions);
        }, (err) => {
            defer.reject(err);
        })
        

    return defer.promise;
}


module.exports = {
    createForum:createForum,
    getForums:getForums,
    deleteForum:deleteForum,
    editForum:editForum,
    getForumPermissions:getForumPermissions
}
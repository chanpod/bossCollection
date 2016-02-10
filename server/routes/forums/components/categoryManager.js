var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');

var ForumManager = require('./forumManager');

var util = require('../../../utility');
var CategorydModel = require('../../../models/forumModels/category.js');

function createCategory(req, res){
    
    var newCategory = new CategorydModel();
    
    var name = req.body.category.name;
    var guild = req.session.user.guild.name;
    var forums = [];
    
    newCategory.name = name;
    newCategory.guild = guild;
    newCategory.forums = forums;
    
    newCategory.save(function(){
        
        res.status(200).send({category: newCategory});
    },function(err){
        res.status(400).send(util.handleErrors(err));
    })
    
}

function getCategories(req, res){
    
    var guild = req.session.user.guild.name;
    var forums = {};
    var defer = q.defer();
    var numOfCategories = 0;
    
    CategorydModel.find({"guild":guild})
        .then(function(categories){
            
            forums.categories = categories;
            var categoryIds = []
            numOfCategories = forums.categories.length;
            
            _(forums.categories).forEach(function(category, index){
                
                ForumManager.getForums(category._id)
                    .then(function(forums){
                        category.forums = forums;
                        
                        forEachFinished(index);
                    })   
            })
            
        })
    
    function forEachFinished(index){
        
        if(index == (numOfCategories - 1)){
            
            defer.resolve(forums);
        }
    }
    
    return defer.promise;
}






module.exports = {
    createCategory:createCategory,
    getCategories:getCategories
}
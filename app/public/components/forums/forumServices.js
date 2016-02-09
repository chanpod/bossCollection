angular.module("BossCollection.forums")
    .service('forumService', [
        '$location', 'siteServices', 
        function($location, siteServices){
        
        var currentForum = {};
        
        function setForum(forum){
            currentForum = forum;
        }
        
        function getThread(thread){
            
        } 
        
        return {
            setForum:setForum
        }
    }]) 
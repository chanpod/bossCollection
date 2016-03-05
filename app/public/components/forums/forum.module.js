'user strict'

angular.module("BossCollection.forums", ['ngRoute'])
    .config(['$routeProvider',  function ($routeProvider) {

        $routeProvider
        .when('/forum', {
            templateUrl: 'forum',
            controller: 'forumController'
        })
        .when('/forum/:forumID', {
            templateUrl: 'thread',
            controller: 'threadController'
        })
        .when('/thread/:threadID',{
            templateUrl: 'threadComments',
            controller: 'commentsController as ctrl'
        })

    }]);
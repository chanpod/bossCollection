'user strict'

angular.module("BossCollection.guild", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/auth/application', {
                templateUrl: 'application',
                controller: 'applicationController'
            }) 
            .when('/reviewApplications', {
                templateUrl: 'reviewApplications',
                controller: 'applicationsReviewController'
            }) 
            .when('/createGuild', {
                templateUrl: 'createGuild',
                controller: 'createGuildController'
            }) 
            .when('/joinGuild', {
                templateUrl: 'joinGuild', 
                controller: 'joinGuildController' 
            }) 
            .when('/manageMembers', {  
                templateUrl: 'manageMembers',  
                controller: 'manageMembersController'
            }) 
            .when('/manageGuild', { 
                templateUrl: 'guildSettings', 
                controller: 'guildSettingsController'
            })
            .when('/myApplications', { 
                templateUrl: 'myApplications', 
                controller: 'myApplicationsCtrl'
            })
    }]);
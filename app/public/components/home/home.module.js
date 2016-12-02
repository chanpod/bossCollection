'user strict'

angular.module("BossCollection.home", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider
        .when('/', {
            templateUrl: 'guildVisitHome',
            controller: 'guildVisitController'
        }) 
        .when('/guild/:guildName', {
            templateUrl: 'guildVisitHome',
            controller: 'guildVisitController'
        })   
         
    }]);         
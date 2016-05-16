'user strict'

angular.module("BossCollection.home", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider
        .when('/', {
            templateUrl: 'home',
            controller: 'homeController'
        })
        .when('/guild/:guildName', {
            templateUrl: 'guildVisitHome',
            controller: 'guildVisitController'
        })   
        
    }]);       
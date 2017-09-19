var ModuleName = "BossCollection.home";

export default ModuleName;

angular.module(ModuleName, ['ngRoute'])
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
'user strict'

angular.module("BossCollection.forums", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/forum', {
            templateUrl: 'forum',
            controller: 'forumsController'
        })

    }]);
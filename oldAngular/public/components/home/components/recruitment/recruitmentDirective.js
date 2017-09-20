
angular.module("BossCollection.home")
    .directive('recruitment', [function () {
        return {
            restrict: 'E',                        
            templateUrl: 'recruitmentTemplate',
            controller: "recruitmentController"
        }
    }])
angular.module("BossCollection.forums")
    .controller('forumController', ['$scope', function($scope){
        
        console.log("Forum Controller loaded");
        $scope.markdown = "";
    }])
var controllers = angular.module("Imn.controllers", ['Imn.services']);

controllers.controller("createEventController", ["$scope", 'eventService', function($scope, $location, eventService){
        $scope.event = {};

        $scope.submitEvent = function(){
            console.log($scope.event);
            var eventCreation = new eventService($scope.event);
            eventCreation.$save(function(p, resp){
                if(!p.error){
                    console.log("Success");
                }
                else{
                    console.log("Error: " + resp);
                }
            })
        }
    }])
    .controller("viewEventController", ["$scope", function($scope){

        $scope.welcomeMessage = "View Events"

    }]);;

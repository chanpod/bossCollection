'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceReportController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter', 'guildServices', '$mdDialog',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter, guildServices, $mdDialog){
        
        var currentDay = moment().day();
        
        var self = this;
        
        self.showContentBool = false;
        $scope.newAbsence = {};
        $scope.absences = {};
        $scope.loading = false;
        $scope.typePicked = false;
        $scope.today = moment(); 
        $scope.dayDesired;
        $scope.currentlySelected = moment().format('dddd - Do');
        
        self.selectedUser = {};
        
        $scope.toolbar = {
            isOpen: false,
            direction: "right"
        }
        
        $scope.cancel = function(){
            $mdDialog.cancel();
        }
        
        self.showContent = function(){
           self.showContentBool = true;
       }
        
        $scope.currentlySelected = "Today";
        $scope.isToolSetOpen = false;
        
        
             
                
        $scope.init = function(){
            
            siteServices.updateTitle('Report Absence');
            
            if($scope.user == undefined){
                
                userLoginSrvc.getUser()
                    .then(function(user) {
                        $scope.user = user
                        
                        if ($scope.user.rank < 3) {
                            self.selectedUser = $scope.user;
                            self.showContent();
                        }
                        else {
                            $scope.getGuildUsers();
                        }
                    })
                
            }
            else{
                if ($scope.user.rank < 3) {
                    self.selectedUser = $scope.user;
                    self.showContent();
                }
                else {
                    $scope.getGuildUsers();
                }
            }
                
        }
        
        $scope.getGuildUsers = function(){
            
            $scope.loading = true;
            
            guildServices.getGuildMembers($scope.user.guild.name)
                .then(function(users){
                    
                    $scope.users = users;
                    self.showContent();  
                })
                .finally(function(){
                    
                    $scope.loading = false;
                })
        }
       
        
       $scope.updateList = function(){
           $scope.currentlySelected = moment($scope.dayDesired).format('dddd - Do');
           
           $scope.getAbsencesByDate();
       }
       
       function calculateNumOfDaysUntil(dayDesired){
           var numOfDaysInWeek = 7;
           
           var nextDate = dayDesired - currentDay;
           
           if(nextDate < 0){
               
                nextDate = numOfDaysInWeek - Math.abs(nextDate);    
           }
           
           
           
           return nextDate;
       }
       
       $scope.formatDate = function(date){
           
           return moment.utc(date).format('dddd, MMM D');
       }

        $scope.getAbsences = function(){
            $scope.currentlySelected = "All absences"
            $scope.loading = true;
            
            absenceService.getAbsences().then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
        
        $scope.getAbsencesByDate = function(){
            
            $scope.loading = true;
            
            absenceService.getAbsencesByDate($scope.dayDesired).then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
         
        $scope.filterSearch = function (filterSearch) {

            return $filter('filter')($scope.users, filterSearch);
        }
         
        $scope.submitNewAbsence = function () {

            if ($scope.newAbsence.date == null) {

                siteServices.showMessageModal("Must select a date")
            }
            else if($scope.newAbsence.type == null){
                siteServices.showMessageModal("Must select a type: Late or Absent")
            }
            else { 
                
                if ($scope.user.rank < 3) {
                    
                    self.selectedUser = $scope.user.name;
                }
                else{
                    
                    $scope.newAbsence.user = self.selectedUser.user;
                }
                
                
                absenceService.submitNewAbsence($scope.newAbsence).then(function (result) {
                
                    //TODO: Redirect to list of absences.
                    siteServices.showMessageModal("Success");
                },
                    function (err) {
                        siteServices.showMessageModal(err);
                        console.log(err);
                    })
            }


        }
        
        
        function filterOutOldDates(){
            
        }
    
        $scope.init();

    }])

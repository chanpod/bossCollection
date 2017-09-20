'use strict';

angular.module("BossCollection.attendance")
    .factory('absenceService', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices', '$mdMedia', '$mdDialog',
        function ($resource, $q, $location, $cookies, $rootScope, siteServices, $mdMedia,$mdDialog) {

            var API_BASE = "/api/guild/absence";
            
            var absence = $resource(API_BASE + '/absence');
            var UserAbsence = $resource(API_BASE + '/absence/:userName');
            var absenceByDate = $resource(API_BASE + '/absenceByDate/:date');
            var absenceHistoryResource = $resource(API_BASE + '/absenceHistory');
            var deleteAbsenceResource = $resource(API_BASE + '/deleteAbsence');
            var saveAbsenceResource = $resource(API_BASE + '/saveAbsence');
                                    
            var absenceApi = {                
                getUsersAbsences: function(user){
                    
                    var defer = $q.defer();                    
                    
                    UserAbsence.get({userName: user}, function(response){
                        defer.resolve(response);
                    })
                    
                    return defer.promise;
                },
                submitNewAbsence: function (newAbsence) {

                    var defer = $q.defer();
 
                    absence.save(newAbsence).$promise
                        .then(function (response) { 

                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data);
                            })
                        .finally(function () {
                            
                        })

                    return defer.promise;
                },
                getAbsenceHistory: function(absenceHistory){
                    
                    var defer = $q.defer();
                    
                    siteServices.startLoading();
                    
                    absenceHistoryResource.save(absenceHistory).$promise
                        .then(function (response) {

                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })
                        
                        return defer.promise;
                },
                openEditModal: function(template, locals) {
                  

                    var defer = $q.defer();
                    var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
                    
                    $mdDialog.show({
                        templateUrl: template,
                        controller: 'absenceModalController',
                        parent: angular.element(document.body),
                        clickOutsideToClose: false,
                        locals: { data: locals },
                        fullscreen: true
                    })
                    .then(function (result) {

                            defer.resolve(result);
                        },
                        function () {
                            defer.reject();
                            //Something broke or they canceled
                        })

                    return defer.promise;
              
                },
                saveAbsence: function(absence){
                    
                    var defer = $q.defer();
                    var bodyData = {absence: absence};
                    
                    saveAbsenceResource.save(bodyData).$promise
                        .then(function (response) {
                            siteServices.successfulUpdate();
                            defer.resolve(response);
                        },
                        function (err) {

                            console.log(err);
                            defer.reject(err.data);
                        })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })
                        
                    return defer.promise;
                },
                deleteAbsence: function(absence){
                    
                    var defer = $q.defer();
                    var bodyData = {absence: absence};
                    
                    deleteAbsenceResource.save(bodyData).$promise
                        .then(function (response) {
                            siteServices.successfulUpdate();
                            defer.resolve(response);
                        },
                        function (err) {

                            console.log(err);
                            defer.reject(err.data);
                        })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })
                        
                    return defer.promise;
                    
                },
                getAbsences: function () {

                    var defer = $q.defer();



                    absence.get().$promise
                        .then(function (response) {

                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })




                    return defer.promise;
                },
                getAbsencesByDate: function (date) {

                    var defer = $q.defer();

                    absenceByDate.get({date:date}, function (response) {

                            defer.resolve(response);
                        })

                    return defer.promise;
                }
            };

            return absenceApi;
        }])
'use strict';

angular.module("BossCollection.attendance")
    .factory('absenceService', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices', '$mdMedia', '$mdDialog',
        function ($resource, $q, $location, $cookies, $rootScope, siteServices, $mdMedia,$mdDialog) {

            var absence = $resource('/api/absence', {}, {});
            var absenceByDate = $resource('/api/absenceByDate', {}, {});
            var absenceHistoryResource = $resource('/api/absenceHistory', {}, {});
            var deleteAbsenceResource = $resource('/api/deleteAbsence');
            var saveAbsenceResource = $resource('/api/saveAbsence');
            
            var absenceApi = {

                submitNewAbsence: function (newAbsence) {

                    var defer = $q.defer();

                    siteServices.startLoading();

                    absence.save(newAbsence).$promise
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

                    absenceByDate.save({date:date}).$promise
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
                }
            };

            return absenceApi;
        }])
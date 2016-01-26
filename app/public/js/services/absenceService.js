'use strict';

angular.module("BossCollection.services")
    .factory('absenceService', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices',
        function ($resource, $q, $location, $cookies, $rootScope, siteServices) {

            var absence = $resource('/api/absence', {}, {})


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
                }
            };

            return absenceApi;
        }])
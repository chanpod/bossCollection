'use strict';

/* Services */
var service = angular.module("BossCollection.services", ["ngResource"]);

service.factory('charService', function($resource){
        var charApi = {
            test: function (){
                console.log("Hello World")
            }
        }

    return charApi;
    });

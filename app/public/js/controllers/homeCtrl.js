'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("homeController", ["$scope", '$location', '$http', '$timeout', 'siteServices',
        function($scope, $location, $http, $timeout, siteServices){
            
            try{
            (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going df
            }

              $('.parallax').parallax();

              var options = [
                {selector: '#staggered-test', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' },
                {selector: '#staggered-test', offset: 205, callback: 'Materialize.toast("Please continue scrolling!", 1500 )' },
                {selector: '#staggered-test', offset: 400, callback: 'Materialize.showStaggeredList("#staggered-test")' },
                {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
              ];

              Materialize.scrollFire(options);
            
            siteServices.updateTitle('Home');
    }])

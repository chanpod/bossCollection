'use strict';
/* Directives */

angular.module('BossCollection.directives').
  directive('ad', [function () {
        return {
            restrict: 'E',
            template: '<ins class="adsbygoogle"style="display:block;overflow:hidden;"data-ad-client="ca-pub-4895481554192451"data-ad-slot="1814022675"data-ad-format="auto">',
 
            link: function (scope, elm, attrs) {

                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                }
                catch (err) {
                    console.log("Add code broke");
                    console.log(err);
                    
                }  
            }
        }  
  }]); 
 
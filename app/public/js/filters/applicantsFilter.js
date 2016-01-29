'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.filters")
    .filter("applicants", [function(){
            
            return function(applicants){
                 var applicantsFiltered = [];
                 applicantsFiltered = _.filter(applicants, function(applicant){ 
                    return applicant.rank == 1;
                })
                 
                return applicantsFiltered.length;
            }
    }])

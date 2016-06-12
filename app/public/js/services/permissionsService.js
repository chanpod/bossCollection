'use strict';



angular.module("BossCollection.services")
    .factory('permissionsService', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast', '$q',
    function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast, $q) {
        
        function isGM(user, guildMembers) {

            let isGM;

            if (user.officer) {
                isGM = user.raider;
            }
            else {

                if (user && user.guild) {

                    guildMember = _.find(guildMembers, { user: user.name });
                    isGM = guildMember.raider;
                }
                else {
                    isGM = undefined;
                }
            }

            return isGM;
        }

        function isRaider (user, guildMembers){
            let isRaider;

            if (user.officer) {
                isRaider = user.raider;
            }
            else {

                if (user && user.guild) {

                    guildMember = _.find(guildMembers, { user: user.name });
                    isRaider = guildMember.raider;
                }
                else {
                    isRaider = undefined;
                }
            }

            return isRaider;
        }

        function isOfficer (user, guildMembers){

            let isOfficer;

            if (user.officer) {
                isOfficer = user.officer;
            }
            else {

                if (user && user.guild) {

                    guildMember = _.find(guildMembers, { user: user.name });
                    isOfficer = guildMember.officer;
                }
                else {
                    isOfficer = undefined;
                }
            }

            return isOfficer;
            
        }

        function getRank(user, guildMembers) {

            var rank;

            if (user.rank) {
                rank = user.rank;
            }
            else {

                if (user && user.guild) {

                    guildMember = _.find(guildMembers, { user: user.name });
                    rank = guildMember.rank;
                }
                else {
                    rank = undefined;
                }
            }

            return rank;
        }

        function isMember(user){

            var isMember;

            if (user.approved) {
                isMember = user.approved;
            }
            else {

                if (user && user.guild) {

                    guildMember = _.find(guildMembers, { user: user.name });
                    isMember = guildMember.approved;
                }
                else {
                    isMember = false;
                } 
            }

            return isMember;
        }
        
        return {
            isGM:isGM,
            isRaider:isRaider,
            isOfficer:isOfficer,
            getRank:getRank,
            isMember:isMember
        }
    }])
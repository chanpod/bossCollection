'use strict';



angular.module("BossCollection.services")
    .factory('guildServices', ['$http', '$q', '$resource', 'siteServices', function ($http, $q, $resource, siteServices) {

        var getMembersUrl = "https://us.api.battle.net/wow/guild/Zul'jin/mkdir%20Bosscollection?fields=members,items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var blizzardBaseUrl = "https://us.api.battle.net/wow/guild/";
        var blizzardEndingUrl = "?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";



        var apply = $resource('/api/applicationSubmission', {}, {});
        var getApplicationsUrl = $resource('/api/getApplications', {}, {});
        var addGuild = $resource('/api/addGuild', {}, {});
        var updateRank = $resource('/api/updateRank', {}, {});
        var changeGuildName = $resource('/api/changeGuildName', {}, {});
        var addMember = $resource('/api/addMember', {}, {});
        var removeMember = $resource('/api/removeMember', {}, {});
        var getGuildMembers = $resource("/api/getGuildMembers", {}, {});
        var getListOfGuilds = $resource("/api/listOfGuilds", {}, {});

        var guildApi = {
            getListOfGuilds: function(){
                var defer = $q.defer();
                
                getListOfGuilds.get().$promise
                    .then(function(guilds){
                         
                        defer.resolve(guilds.guilds);
                    })
                    .catch(function(err){
                        
                        defer.reject(err);
                    }) 
                return defer.promise;
            },
            updateRank: function (guildName, member) {

                var defer = $q.defer();

                updateRank.save(
                    {
                        guildName: guildName,
                        member: member
                    }).$promise
                    .then(function (result) {

                        defer.resolve(result.members);
                    })
                    .catch(function (err) {

                        defer.reject(err.data);
                    })

                return defer.promise;
            },
            getGuildMembers: function (guildName) {

                var defer = $q.defer();

                getGuildMembers.save({ guildName: guildName }).$promise
                    .then(function (result) {

                        defer.resolve(result.members);
                    })
                    .catch(function (err) {

                        defer.reject(err.data);
                    })

                return defer.promise;
            },
            createGuild: function (guildName) {
                var defer = $q.defer();

                addGuild.save({ guildName: guildName }).$promise
                    .then(function (result) {

                        defer.resolve(result.data);
                    })
                    .catch(function (err) {

                        defer.reject(err.data);
                    })

                return defer.promise;
            },
            joinGuild: function (guildName, memberName) {
                var defer = $q.defer();

                addMember.save({
                    guildName: guildName,
                    memberName: memberName
                }).$promise
                    .then(function (result) {

                        defer.resolve(result.guild);
                    })
                    .catch(function (err) {

                        defer.reject(err.data.message);
                    })

                return defer.promise;
            },
            leaveGuild: function (guildName) {
                var defer = $q.defer();

                removeMember.save({ guildName: guildName }).$promise
                    .then(function (result) {

                        defer.resolve(result.data);
                    })
                    .catch(function (err) {

                        defer.reject(err.data);
                    })

                return defer.promise;
            },
            getApplications: function () {

                var defer = $q.defer();

                siteServices.startLoading();

                getApplicationsUrl.get().$promise
                    .then(function (applications) {

                        defer.resolve(applications);
                    },
                        function (err) {

                            defer.reject(err);
                        })
                    .finally(function () {
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            validateCharacterName: function (characterName, realm) {

                var defer = $q.defer();
                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                var getCharacter = $resource(getCharacterUrl, {}, {});

                getCharacter.get().$promise.then(function (data) {

                    defer.resolve(data);
                },
                    function (err) {

                        defer.reject("Character not found");
                    });

                return defer.promise;
            },

            getGuild: function (realm, guildName) {
                var defer = $q.defer()

                siteServices.startLoading();

                if (realm != "" && guildName != "") {
                    var getMembersUrl = blizzardBaseUrl + encodeURIComponent(realm) + "/" + encodeURIComponent(guildName) + blizzardEndingUrl;
                }

                $http({ method: 'GET', url: getMembersUrl })
                    .then(function (data) {

                        defer.resolve(data.data.members);
                    },
                        function (err) {
                            defer.reject(err);
                        })
                    .finally(function () {
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            submitApplication: function (newApplicant) {
                var defer = $q.defer();

                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + newApplicant.realm.name + "/" + newApplicant.character.name + "?fields=talents&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                var getCharacter = $resource(getCharacterUrl, {}, {});

                siteServices.startLoading();

                getCharacter.get().$promise
                    .then(function (characterWithSpec) {


                        return characterWithSpec;
                    },
                        function (err) {

                            defer.reject("Character not found");
                        })
                    .then(function (characterWithSpec) {

                        newApplicant.character.specs = characterWithSpec.talents;

                        apply.save({ "newApplicant": newApplicant }).$promise.then(function (submitted) {

                            siteServices.loadingFinished();
                            defer.resolve(submitted);
                        },
                            function (err) {

                                defer.reject(err);
                            })

                    })
                    .finally(function () {

                        siteServices.loadingFinished();
                    })
                return defer.promise;
            }
        };

        return guildApi;
    }])
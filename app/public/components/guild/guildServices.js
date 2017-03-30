'use strict';



angular.module("BossCollection.guild")
    .factory('guildServices', [
        '$http', '$q', '$resource', 'siteServices', 'userLoginSrvc',
        function ($http, $q, $resource, siteServices, userLoginSrvc) {

            var getMembersUrl = "https://us.api.battle.net/wow/guild/Zul'jin/mkdir%20Bosscollection?fields=members,items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
            var blizzardBaseUrl = "https://us.api.battle.net/wow/guild/";
            var blizzardEndingUrl = "?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

            var classes = ["placeholder", "warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock", "monk", "druid", "demon hunter"]

            var API_BASE = "/api/guild/guild";
            var APPLICATION_API_BASE = "/api/guild/applications";
            var RECRUITMENT_API_BASE = "/api/guild/recruitment";


            var apply = $resource(APPLICATION_API_BASE + '/applicationSubmission');
            var getApplicationsUrl = $resource(APPLICATION_API_BASE + '/getApplications/:startDate');
            var getUserApplicationsUrl = $resource(APPLICATION_API_BASE + '/getApplications/user/:user/:startDate');
            var approveApplication = $resource(APPLICATION_API_BASE + '/approveApplication');
            var rejectApplication = $resource(APPLICATION_API_BASE + '/rejectApplication');
            var deleteApplicationResource = $resource(APPLICATION_API_BASE + '/deleteApplication');

            var addGuild = $resource(API_BASE + '/addGuild');
            var updateRank = $resource(API_BASE + '/updateRank');
            var changeGuildName = $resource(API_BASE + '/changeGuildName');
            var addMember = $resource(API_BASE + '/addMember');
            var removeMember = $resource(API_BASE + '/removeMember');
            var kickuserResource = $resource(API_BASE + '/kickMember');
            var getGuildMembers = $resource(API_BASE + '/getGuildMembers');
            var getListOfGuilds = $resource(API_BASE + '/listOfGuilds');
            var guildHomepageContentResource = $resource(API_BASE + '/guildHomepage/:guildName');
            var guildSettingsResource = $resource(API_BASE + "/guildSettings");

            var guildRecruitmentResource = $resource(RECRUITMENT_API_BASE + "/:guildName");

            var guildApi = {
                getClassName: function (classID) {
                    return classes[classID];
                },
                saveGuildSettings: function (guildSettings) {
                    return guildSettingsResource.save({ guild: guildSettings }).$promise;
                },
                getGuildSettings: function () {
                    return guildSettingsResource.get().$promise;
                },
                updateHomepageContent: function (guild, guildName) {

                    var bodyData = { guild: guild }; //no data, it's a get
                    return guildHomepageContentResource.save({ guildName: guildName }, bodyData).$promise
                },
                getHomepageContent: function (guildName) {

                    var bodyData = {}; //no data, it's a get
                    return guildHomepageContentResource.get({ guildName: guildName }).$promise
                },

                getRecruitment : (guildName) => {
                    return guildRecruitmentResource.get({guildName: guildName}).$promise;
                },

                updateRecruitment: (guildName, recruitment) => {
                    return guildRecruitmentResource.save({guildName: guildName}, {recruitment: recruitment}).$promise;
                },
                kickUser: function (userName, guildName) {

                    var bodyData = { userName: userName, guildName: guildName };
                    return kickuserResource.save(bodyData).$promise
                },
                approveApplication: function (application) {

                    var bodyData = { application: application };
                    return approveApplication.save(bodyData).$promise
                },
                rejectApplication: function (application) {

                    var bodyData = { application: application };
                    return rejectApplication.save(bodyData).$promise
                },
                getListOfGuilds: function () {
                    var defer = $q.defer();

                    siteServices.startLoading();

                    getListOfGuilds.get().$promise
                        .then(function (guilds) {

                            defer.resolve(guilds.guilds);
                        })
                        .catch(function (err) {

                            defer.reject(err.data.message);
                        })
                        .finally(function () {
                            siteServices.loadingFinished();
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

                            defer.reject(err.data.message);
                        })
                        .finally(function () {
                            siteServices.loadingFinished();
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

                            defer.reject(err.data.message);
                        })
                        .finally(function () {

                        })

                    return defer.promise;
                },
                createGuild: function (guildName) {
                    var defer = $q.defer();



                    addGuild.save({ guildName: guildName }).$promise
                        .then(function (result) {

                            defer.resolve(result.guild);
                        })
                        .catch(function (err) {

                            defer.reject(err.data.message);
                        })
                        .finally(function () {

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

                            defer.reject(err.data);

                        })
                        .finally(function () {

                        })

                    return defer.promise;
                },
                leaveGuild: function (guildName) {
                    var defer = $q.defer();

                    siteServices.startLoading();

                    removeMember.save({ guildName: guildName }).$promise
                        .then(function (result) {

                            defer.resolve(result.user);
                        })
                        .catch(function (err) {

                            defer.reject(err.data.message);
                        })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })

                    return defer.promise;
                },
                getApplications: function (startDate) {

                    var defer = $q.defer();

                    siteServices.startLoading();

                    getApplicationsUrl.get({ startDate: startDate }).$promise
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

                deleteApplication: (appID) => {

                    var defer = $q.defer();

                    siteServices.startLoading();

                    deleteApplicationResource.save({ appID: appID}).$promise
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

                getUserApplications: (user, date) => {
                    

                    var defer = $q.defer();

                    siteServices.startLoading();

                    getUserApplicationsUrl.get({ user: user, startDate: date }).$promise
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
                getProgression: function (characterName, realm) {

                    var defer = $q.defer();
                    var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?fields=progression&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                    var getCharacter = $resource(getCharacterUrl);

                    getCharacter.get().$promise.then(function (data) {

                        defer.resolve(data.progression);
                    },
                        function (err) {

                            defer.reject("Character not found");
                        });

                    return defer.promise;
                },
                getItemLevel: function (characterName, realm) {

                    var defer = $q.defer();
                    var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?fields=items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                    var getCharacter = $resource(getCharacterUrl);

                    getCharacter.get().$promise.then(function (data) {

                        defer.resolve(data.items.averageItemLevelEquipped);
                    },
                        function (err) {

                            defer.reject("Character not found");
                        });

                    return defer.promise;
                },
                validateCharacterName: function (characterName, realm) {

                    var defer = $q.defer();
                    var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                    var getCharacter = $resource(getCharacterUrl);

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

                    var getCharacter = $resource(getCharacterUrl);



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

            function getUsersRank(userName, guild) {

                var memberListing;

                memberListing = _.find(guild.members, { user: userName });
                return memberListing.rank;
            }



            return guildApi;



        }])
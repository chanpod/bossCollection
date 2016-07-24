var express = require('express');
var router = express.Router();
var q = require('q');
var GuildModel = require('models/guild.js');
var moment = require('moment');
var _ = require('lodash');
var ranks = [1, 2, 3, 4];
var util = require('utility');

function getListOfGuilds(req, res) {

    var defer = q.defer();

    GuildModel.find({})
        .then(function (guilds) {

            defer.resolve({ guilds: guilds });
        }, function (err) {

            defer.reject(err);
        })

    return defer.promise;

}

function addGuild(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;
    var guildManager = req.session.user.name

    findUsersGuild(guildManager)
        .then(function (guildExist) {
            if (guildExist) {

                throw new Error("You already belong to a guild");
            }
            return GuildModel.findOne({ name: guildName })
        })
        .then(
        function (guild) {

            if (guild != null) {
                defer.reject("Guild already exist");
                return;
            }

            var newGuild = new GuildModel();

            newGuild.name = guildName;
            newGuild.members.push({
                user: guildManager,
                rank: 0,
                officer: true,
                raider: true,
                GM: true,
                approved: true
            })

            newGuild.ranks = [
                {
                    name: "GM",
                    raider: true,
                    officer: true,
                    rank: 0
                }
            ]

            return newGuild.save(function (savedGuild) {

                req.session.user.guild = newGuild;
                buildGuildCookie(req, res, newGuild);

                return util.saveSession(req, res);
            });
        })
        .then(function (user) {

            defer.resolve(user);
        })
        .fail(function (err) {

            defer.reject(err);
        })

    return defer.promise;
};

/**
 * Verify permission
 * Find guild
 * Find member existing rank
 * update object
 * save to DB
 *  
 */
function updateUserRank(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;
    var guildMember = req.body.member;
    var guildMemberName = guildMember.user;
    var requester = req.session.user.name
    var guildMemberNewRank = guildMember.rank;

    findGuild(guildName)
        .then(function (guild) {

            if (isAdmin(guild.members, requester)) {

                var indexOfMember = doesMemberExist(guild.members, guildMemberName);
                if (indexOfMember == -1) {
                    defer.reject("Member doesn't exist.");
                }

                //guild.members[indexOfMember] = guildMember;
                _.extend(guild.members[indexOfMember], guildMember);

                guild.save(function (savedGuild) {

                    buildGuildCookie(req, res, guild);

                    util.saveSession(req, res)
                        .then(function (user) {

                            defer.resolve(user);
                        })
                }, function (err) {

                    defer.reject(err);
                });

            }
            else {
                defer.reject("Insufficient privileges");
            }
        })
        .fail(function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function getGuildMembers(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;

    findGuild(guildName)
        .then(function (guild) {

            var nonMongooseGuild = guild.toObject();
            var members = nonMongooseGuild.members;

            if (guild) {

                defer.resolve({ members: members })
            }
            else {
                throw new Error("You don't belong to a guild.")
            }

        })
        .fail(function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function addMember(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;
    var memberName = req.session.user.name;

    var newMember = {
        user: memberName,
        rank: undefined,
        officer: false,
        raider: false,
        GM: false,
        approved: false
    }

    findGuild(guildName)
        .then(function (guild) {

            if (!guild) {
                throw new Error("Guild doesn't exist. You can create it if you're the GM");
                return;
            }

            console.log("Seeing if guild exist");
            console.log("Guild name: " + guild.name);
            console.log("User name: " + memberName);
            var indexOfMember = doesMemberExist(guild.members, memberName);
            if (indexOfMember != -1) {

                throw new Error("You are already a part of this guild.");
            }

            let lowestRank = 0;

            _.forEach(guild.ranks, (rank, index) => {

                if (lowestRank < rank.rank) {
                    lowestRank = rank.rank;
                }
            })

            newMember.rank = lowestRank;

            guild.members.push(newMember);

            guild.save(function () {

                req.session.user.guild = guild;
                buildGuildCookie(req, res, guild);

                util.saveSession(req, res)
                    .then(function (user) {

                        defer.resolve({ user: user });
                    })
            });
        })
        .fail(function (err) {

            defer.reject(err);

        })

    return defer.promise;
}

/**
 * Force kicked by officer
 */
function kickMember(req, res) {

    var defer = q.defer();

    var userName = req.body.userName.user;
    var guildName = req.body.guildName

    removeUserFromGuild(userName, guildName)
        .then(function (user) {

            defer.resolve(user);
        })
        .fail(function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

/**
 * Voluntarily leaving a guild
 */
function removeMember(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;
    var guildMemberName = req.session.user.name;

    removeUserFromGuild(guildMemberName, guildName)
        .then(function (user) {

            delete req.session.user.guild;

            util.saveSession(req, res)
                .then(function (user) {

                    defer.resolve(user);
                })

        })
        .fail(function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function saveGuildSettings(req, res) {

    var guildSettings = req.body.guild;
    var promise = new Promise((resolve, reject) => {

        var usersGuild = req.session.user.guild.name;

        GuildModel.findOne({ name: usersGuild })
            .then(function (guild) {

                _.assign(guild, guildSettings);
                guild.save(() => {

                    resolve({ guild: guild })
                });


            }, function (err) {

                reject(err);
            })

    })

    return promise;
}

function getGuildSettings(req, res) {

    var promise = new Promise((resolve, reject) => {

        if (req.session.user.guild) {
            var usersGuild = req.session.user.guild.name;

            GuildModel.findOne({ name: usersGuild })
                .then(function (guild) {

                    resolve({ guild: guild })

                }, function (err) {

                    reject(err);
                })
        }
        else {
            reject("No guild");
        }


    })

    return promise;
}

function getGuildHomepage(req, res) {

    var defer = q.defer();

    var usersGuild = req.params.guildName;

    GuildModel.findOne({ name: usersGuild })
        .then(function (guild) {

            defer.resolve({ guild: guild });
        }, function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function updateGuildHomepage(req, res) {

    var defer = q.defer();

    var usersGuild = req.session.user.guild.name
    var updatedGuild = req.body.guild

    GuildModel.findOne({ name: usersGuild })
        .then(function (guild) {

            guild.tabs = updatedGuild.tabs;

            guild.save(function () {

                defer.resolve({ guild: guild });
            })


        }, function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function getRanks(req, res) {

}

function createRank(req, res) {

}

function updateGuildRank(req, res) {

}

function deleteRank(req, res) {

}

function isOfficer(userName) {

    var defer = q.defer();

    getMemberSettings(userName)
        .then(member => {

            let isOfficer = false;

            if (member.officer || member.GM) {

                isOfficer = true;
            }

            defer.resolve(isOfficer);
        })

    return defer.promise;
}

function isRaider(userName) {

    var defer = q.defer();

    getMemberSettings(userName)
        .then(member => {

            let isRaider = false;

            if (member.raider) {

                isRaider = true;
            }

            defer.resolve(isRaider);
        })

    return defer.promise;
}

function getMemberSettings(userName) {

    var defer = q.defer();

    findUsersGuild(userName)
        .then(guild => {

            var memberIndex = _.findIndex(guild.members, { 'user': userName });

            defer.resolve(guild.members[memberIndex]);
        })
        .catch(err => {
            defer.reject(err);
        })

    return defer.promise;
}


module.exports = {
    updateGuildHomepage: updateGuildHomepage,
    buildGuildCookie: buildGuildCookie,
    saveGuildSettings: saveGuildSettings,
    getGuildHomepage: getGuildHomepage,
    getGuildSettings: getGuildSettings,
    getGuildMembers: getGuildMembers,
    getListOfGuilds: getListOfGuilds,
    findUsersGuild: findUsersGuild,
    removeMember: removeMember,
    kickMember: kickMember,
    updateUserRank: updateUserRank,
    addMember: addMember,
    addGuild: addGuild,
    getRanks: getRanks,
    createRank: createRank,
    updateGuildRank: updateGuildRank,
    deleteRank: deleteRank,
    isAdmin: isAdmin,
    isOfficer: isOfficer,
    isRaider: isRaider,
    getGuild: findGuild

};

function findUsersGuild(username) {
    var defer = q.defer();

    GuildModel.findOne({ members: { $elemMatch: { user: username } } })
        .then(function (guildFound) {


            defer.resolve(guildFound);

        }, function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function buildGuildCookie(req, res, guild) {

    req.session.user.guild = {};
    req.session.user.guild.members = [];

    if (guild.members) {

        var userIndex = doesMemberExist(guild.members, req.session.user.name);
        req.session.user.guild.members[0] = guild.members[userIndex];
    }

    req.session.user.guild.name = guild.name;

}

function removeUserFromGuild(guildMemberName, guildName) {

    var defer = q.defer();

    findGuild(guildName)
        .then(function (guild) {

            if (guild) {

                var indexOfMember = doesMemberExist(guild.members, guildMemberName);

                if (indexOfMember == -1) {
                    throw new Error("Member doesn't exist.");
                }

                guild.members.splice(indexOfMember, 1);

                guild.save(function (savedGuild) {
                    defer.resolve();

                }, function (err) {

                    defer.reject(err);
                });
            }
            else {
                throw new Error("Guild no longer exists?");
            }
        })
        .fail(function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function isAdmin(memberList, memberName) {

    var isAdmin = false;
    var indexOfMember = doesMemberExist(memberList, memberName);

    if (indexOfMember != -1) {

        var memberRank = memberList[indexOfMember]

        if (memberRank.officer || memberRank.GM) {
            isAdmin = true;
        }
        else {
            isAdmin = false;
        }
    }

    return isAdmin;
}

/**
 * Returns index of member if they exist.
 * Returns -1 if no matches found.
 */
function doesMemberExist(memberList, memberName) {

    var doesExist = _.findIndex(memberList, { 'user': memberName });

    return doesExist; // -1 if member doesn't exist. Otherwise, it's the index of the array.
}



function findGuild(name) {

    var defer = q.defer();

    GuildModel.findOne({ name: name })
        .then(function (guild) {

            if (guild == null) {
                defer.reject("Guild doesn't exist");
                return;
            }

            defer.resolve(guild);
        })

    return defer.promise;
}
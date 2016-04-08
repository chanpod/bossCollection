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
        .then(function(guilds) {

            defer.resolve({ guilds: guilds });
        }, function(err) {

            defer.reject(err);
        })
    
    return defer.promise;

}

function addGuild(req, res) {
    
    var defer = q.defer();
    
    var guildName = req.body.guildName;
    var guildManager = req.session.user.name

    findUsersGuild(guildManager)
        .then(function(guildExist) {
            if (guildExist) {

                throw new Error("You already belong to a guild");
            }
            return GuildModel.findOne({ name: guildName })
        })
        .then(
        function(guild) {

            if (guild != null) {
                defer.reject("Guild already exist");
                return;
            }

            var newGuild = new GuildModel();

            newGuild.name = guildName;
            newGuild.members.push({
                user: guildManager,
                rank: ranks.length
            })

            return newGuild.save(function(savedGuild) {

                req.session.user.guild = newGuild;
                buildGuildCookie(req, res, newGuild);

                return util.saveSession(req, res);
            });
        })
        .then(function(user) {

            defer.resolve(user);
        })
        .fail(function(err) {

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
function updateRank(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;
    var guildMemberName = req.body.member.user;
    var requester = req.session.user.name
    var guildMemberNewRank = req.body.member.rank;

    findGuild(guildName)
        .then(function(guild) {

            if (isAdmin(guild.members, requester)) {

                var indexOfMember = doesMemberExist(guild.members, guildMemberName);
                if (indexOfMember == -1) {
                    defer.reject("Member doesn't exist.");
                }

                guild.members[indexOfMember].rank = guildMemberNewRank;

                guild.save(function(savedGuild) {

                    buildGuildCookie(req, res, guild);

                    util.saveSession(req, res)
                        .then(function(user) {

                            defer.resolve(user);
                        })
                }, function(err) {

                    defer.reject(err);
                });

            }
            else {
                defer.reject("Insufficient privileges");
            }
        })
        .fail(function(err) {

            defer.reject(err);
        })

    return defer.promise;
}

function getGuildMembers(req, res) {

    var defer = q.defer();

    var guildName = req.body.guildName;

    findGuild(guildName)
        .then(function(guild) {

            var nonMongooseGuild = guild.toObject();
            var members = nonMongooseGuild.members;

            if (guild) {

                if (isAdmin(members, req.session.user.name)) {

                    defer.resolve({ members: members })
                }
                else {
                    throw new Error("You don't have sufficient priveleges.")
                }
            }
            else {
                throw new Error("You don't belong to a guild.")
            }

        })
        .fail(function(err) {

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
        rank: 1
    }

    findGuild(guildName)
        .then(function(guild) {

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
                return;
            }


            guild.members.push(newMember);

            guild.save(function() {

                req.session.user.guild = guild;
                buildGuildCookie(req, res, guild);

                util.saveSession(req, res)
                    .then(function(user) {

                        defer.resolve({ user: user });
                    })
            });
        })
        .fail(function(err) {

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
        .then(function(user) {

            defer.resolve(user);
        })
        .fail(function(err) {

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
        .then(function(user) {

            delete req.session.user.guild;

            util.saveSession(req, res)
                .then(function(user) {

                    defer.resolve(user);
                })

        })
        .fail(function(err) {

            defer.reject(err);
        })
        
    return defer.promise;
}



function getGuildHomepage(req, res) {

    var defer = q.defer();

    var usersGuild = req.params.guildName;

    GuildModel.findOne({ name: usersGuild })
        .then(function(guild) {

            defer.resolve({ guild: guild });
        }, function(err) {

            defer.reject(err);
        })

    return defer.promise;
}
    
function updateGuildHomepage(req, res) {

    var defer = q.defer();

    var usersGuild = req.session.user.guild.name
    var updatedGuild = req.body.guild

    GuildModel.findOne({ name: usersGuild })
        .then(function(guild) {

            guild.tabs = updatedGuild.tabs;

            guild.save(function() {

                defer.resolve({ guild: guild });
            })


        }, function(err) {

            defer.reject(err);
        })
        
    return defer.promise;
}



module.exports = {        
    updateGuildHomepage:updateGuildHomepage,
    buildGuildCookie:buildGuildCookie,
    getGuildHomepage:getGuildHomepage,
    getListOfGuilds:getListOfGuilds,
    getGuildMembers:getGuildMembers,
    findUsersGuild:findUsersGuild,
    removeMember:removeMember,    
    kickMember:kickMember,
    updateRank:updateRank,
    addMember:addMember,
    addGuild:addGuild
    };

function findUsersGuild (username) {
    var defer = q.defer();

    GuildModel.findOne({ members: { $elemMatch: { user: username } } })
        .then(function (guildFound) {


            defer.resolve(guildFound);

        }, function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

function buildGuildCookie (req, res, guild){
    
    req.session.user.guild = {};
    req.session.user.guild.members = [];
    
    if(guild.members){
        
        var userIndex = doesMemberExist(guild.members, req.session.user.name);
        req.session.user.guild.members[0] = guild.members[userIndex];    
    }
    
    req.session.user.guild.name = guild.name;
    
}

function removeUserFromGuild(guildMemberName, guildName){
    
    var defer = q.defer();
    
    findGuild(guildName)
        .then(function(guild) {

            if (guild) {

                var indexOfMember = doesMemberExist(guild.members, guildMemberName);

                if (indexOfMember == -1) {
                    throw new Error("Member doesn't exist.");                    
                }

                guild.members.splice(indexOfMember, 1);

                guild.save(function(savedGuild) {
                    defer.resolve();
                    
                }, function(err) {

                    defer.reject(err);
                });
            }
            else {
                throw new Error("Guild no longer exists?");
            }
        })
        .fail(function(err) {

            defer.reject(err);
        })
    
    return defer.promise;
}

function isAdmin(memberList, memberName) {

    var isAdmin = false;
    var indexOfMember = doesMemberExist(memberList, memberName);

    if (indexOfMember != -1) {

        var memberRank = memberList[indexOfMember].rank

        if (memberRank < 3) {
            isAdmin = false;
        }
        else {
            isAdmin = true;
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
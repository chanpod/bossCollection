var express = require('express');
var router = express.Router();
var q = require('q');
var GuildModel = require('../../models/guild.js');
var moment = require('moment');
var _ = require('lodash');
var ranks = [1, 2, 3, 4];

router.route('/listOfGuilds')
    .get(function(req, res){
        
        GuildModel.find({})
            .then(function(guilds){
               
                res.status(200).send({guilds: guilds});
            }, function(err){
                res.status(400).send(err);
            })
        
    })

router.route('/addGuild')
    .post(function (req, res) {

        var guildName = req.body.guildName;
        var guildManager = req.session.user.name

        router.findUsersGuild(guildManager)
            .then(function(guildExist){
                if(guildExist){
                    
                    throw new Error("You already belong to a guild");
                }
                return GuildModel.findOne({ name: guildName })
            })
            .then(
                function (guild) {

                    if (guild != null) {
                        res.status(400).send("Guild already exist");
                        return;
                    }

                    var newGuild = new GuildModel();

                    newGuild.name = guildName;
                    newGuild.members.push({
                        user: guildManager,
                        rank: ranks.length
                    })

                    newGuild.save(function (savedGuild) {

                        res.status(200).send(savedGuild);
                    });
                })
            .fail(function (err) {
                if (err.message) {
                    res.status(400).send({ message: err.message });
                }
                else {
                    res.status(400).send({ message: err });
                }
            })
        
    })
    
/**
 * Verify permission
 * Find guild
 * Find member existing rank
 * update object
 * save to DB
 *  
 */
router.route('/updateRank')
    .post(function (req, res) {

        var guildName = req.body.guildName;
        var guildMemberName = req.body.member.user;
        var requester = req.session.user.name
        var guildMemberNewRank = req.body.member.rank;


        findGuild(guildName)
            .then(function (guild) {

                if (isAdmin(guild.members, requester)) {

                    var indexOfMember = doesMemberExist(guild.members, guildMemberName);
                    if (indexOfMember == -1) {
                        res.status(400).send("Member doesn't exist.");
                    }

                    guild.members[indexOfMember].rank = guildMemberNewRank;

                    guild.save(function (savedGuild) {

                        res.status(200).send({response: true});
                    }, function (err) {

                        res.status(400).send(err);
                    });

                }
                else {
                    res.status(400).send("Insufficient privileges");
                }
            })
            .fail(function (err) {

                res.status(400).send(err);
            })


    })

router.route('/changeGuildName')
    .post(function (req, res) {

    })
    
router.route('/getGuildMembers')
    .post(function(req, res){
        
        var guildName = req.body.guildName;
        
        findGuild(guildName)
            .then(function (guild) {
                var nonMongooseGuild = guild.toObject();
                var members = nonMongooseGuild.members;
                if(guild){
                    
                    if(isAdmin(members, req.session.user.name)){
                        
                        res.status(200).send({members: members})
                    }
                    else{
                        throw new Error("You don't have sufficient priveleges.")    
                    }
                }
                else{
                    throw new Error("You don't belong to a guild.")
                }
                
            })
            .fail(function(err){
                
                res.status(400).send(err);
            })
    })

router.route('/addMember')
    .post(function (req, res) {

        var guildName = req.body.guildName;
        var memberName = req.session.user.name;

        var newMember = {
            user: memberName,
            rank: 1
        }

        findGuild(guildName)
            .then(function (guild) {
                
                if(!guild){
                    throw new Error("Guild doesn't exist. You can create it if you're the GM");
                    return;
                }

                var indexOfMember = doesMemberExist(guild.members, memberName);
                if (indexOfMember != -1) {
                    
                    throw new Error("You are already a part of this guild.");
                    return;
                }

                
                guild.members.push(newMember);
                
                guild.save(function () {
                    
                    

                    req.session.user.guild = guild._doc;
                    req.session.save(function () {
                        
                        // update the user's login cookies if they exists //
                        if (req.cookies.user != undefined && req.cookies.pass != undefined) {

                            res.cookie('user', req.session.user.name, { maxAge: 900000 });
                            res.cookie('password', req.session.password, { maxAge: 900000 });
                        }

                       res.status(200).send({response: true, guild: guild._doc});
                    });
                    
                    
                }, function (err) {

                    res.status(400).send(err);
                });
            })
            .fail(function (err) {
                
                if(err.message){
                    res.status(400).send({message: err.message});    
                }
                else{
                    res.status(400).send({message: err});    
                }
                
            })

    })

router.route('/removeMember')
    .post(function (req, res) {
        
        var guildName = req.body.guildName;
        var guildMemberName = req.session.user.name;
        
        findGuild(guildName)
            .then(function (guild) {

                if (guild) {

                    var indexOfMember = doesMemberExist(guild.members, guildMemberName);
                    
                    if (indexOfMember == -1) {
                        throw new Error("Member doesn't exist.");
                        return;
                    }

                    guild.members.splice(indexOfMember, 1);
                    
                    guild.save(function (savedGuild) {
                        delete req.session.user.guild;    
                        req.session.save(function () {
                        
                            // update the user's login cookies if they exists //
                            if (req.cookies.user != undefined && req.cookies.pass != undefined) {

                                res.cookie('user', req.session.user.name, { maxAge: 900000 });
                                res.cookie('password', req.session.password, { maxAge: 900000 });
                            }

                            req.session.reload(function () {

                                res.status(200).send({user: req.session.user});
                            })
                        });

                        
                    }, function (err) {

                        res.status(400).send(err);
                    });
                }
                else {
                    throw new Error("Guild no longer exists? Don't ask...");
                }
            })
            .fail(function (err) {

                res.status(400).send(err);
            })
    })

router.findUsersGuild = function (username) {
    var defer = q.defer();

    GuildModel.findOne({ members: {$elemMatch:{user: username }}})
        .then(function (guildFound) {

            
            defer.resolve(guildFound);
            
        },function (err) {

            defer.reject(err);
        })

    return defer.promise;
}

module.exports = router;



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
var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');
var ranks = [1, 2, 3, 4];
var util = require('utility');

const DEATHKNIGHT = "deathknight";
const DEMONHUNTER = "demonhunter";
const DRUID = "druid";
const HUNTER = "hunter";
const MAGE = "mage";
const MONK = "monk";
const PALADIN = "paladin";
const PRIEST = "priest";
const ROGUE = "rogue";
const SHAMAN = "shaman";
const WARLOCK = "warlock";
const WARRIOR = "warrior";

var RecruitmentModel = require('models/recruitment.js');

const RECRUITMENT = "recruitment";

function getRecruitment(req, res) {

    var defer = q.defer();

    let guildName = req.params.guildName;

    RecruitmentModel.findOne({ guild: guildName })
        .then(function (recruitment) {

            if (recruitment == undefined) {

                createRecruitment(guildName)
                    .then(recruitment => {

                        defer.resolve({ recruitment: recruitment });
                    })
                    .catch(err => {

                        defer.reject(util.handleError(err));
                    })
            }
            else {

                defer.resolve({ recruitment: recruitment });
            }
        }, function (err) {

            defer.reject(util.handleError(err));
        })

    return defer.promise;
}

function updateRecruitment(req, res) {

    var defer = q.defer();

    let recruitmentID = req.body.recruitment._id;
    let recruitmentObject = req.body.recruitment;

    RecruitmentModel.findOneAndUpdate({ _id: recruitmentID }, recruitmentObject)
        .then(function (recruitment) {

            defer.resolve(recruitmentObject);
        }, function (err) {

            defer.reject(util.handleError(err));
        })

    return defer.promise;

}

function createRecruitment(guildName) {

    var defer = q.defer();

    var newRecruitment = new RecruitmentModel();

    newRecruitment.recruitmentNeeds = initializeRecruitment(newRecruitment.recruitmentNeeds);

    newRecruitment.guild = guildName;

    newRecruitment.save().then(function (result) {

        defer.resolve(result);
    },
        function (err) {

            defer.reject(util.handleErrors(err));
        })

    return defer.promise;
}

function initializeRecruitment(recruitmentNeeds) {

    let desire = "None";
    let amount = 0;
    let anySpec = false;
    let total = 0;


    _.forEach(recruitmentNeeds._doc.recruitmentNeeds, function (value, key) {

        switch (key) {
            case DEATHKNIGHT:

                value.class = "Death Knight";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.blood.spec = "blood";
                value.specs.blood.desire = desire;
                value.specs.blood.amount = amount;

                value.specs.blood.spec = "frost";
                value.specs.frost.desire = desire;
                value.specs.frost.amount = amount;

                value.specs.blood.spec = "unholy";
                value.specs.unholy.desire = desire;
                value.specs.unholy.amount = amount;

                //recruitmentNeeds[key] = value;
                break;
            case DEMONHUNTER:

                value.class = "Demon Hunter";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.vengeance.spec = "vengeance";
                value.specs.vengeance.desire = desire;
                value.specs.vengeance.amount = amount;

                value.specs.havoc.spec = "havoc";
                value.specs.havoc.desire = desire;
                value.specs.havoc.amount = amount;

                break;
            case DRUID:

                value.class = "Druid";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.guardian.spec = "guardian";
                value.specs.guardian.desire = desire;
                value.specs.guardian.amount = amount;

                value.specs.restoration.spec = "restoration";
                value.specs.restoration.desire = desire;
                value.specs.restoration.amount = amount;

                value.specs.feral.spec = "feral";
                value.specs.feral.desire = desire;
                value.specs.feral.amount = amount;

                value.specs.balance.spec = "balance";
                value.specs.balance.desire = desire;
                value.specs.balance.amount = amount;
                break;

            case HUNTER:

                value.class = "Hunter";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.beastmastery.spec = "beastmastery";
                value.specs.beastmastery.desire = desire;
                value.specs.beastmastery.amount = amount;

                value.specs.marksman.spec = "marksman";
                value.specs.marksman.desire = desire;
                value.specs.marksman.amount = amount;

                value.specs.survival.spec = "survival";
                value.specs.survival.desire = desire;
                value.specs.survival.amount = amount;
                break;

            case MAGE:

                value.class = "Mage";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.arcane.spec = "arcane";
                value.specs.arcane.desire = desire;
                value.specs.arcane.amount = amount;

                value.specs.frost.spec = "frost";
                value.specs.frost.desire = desire;
                value.specs.frost.amount = amount;

                value.specs.fire.spec = "fire";
                value.specs.fire.desire = desire;
                value.specs.fire.amount = amount;
                break;

            case MONK:

                value.class = "Monk";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.windwalker.spec = "windwalker";
                value.specs.windwalker.desire = desire;
                value.specs.windwalker.amount = amount;

                value.specs.mistweaver.spec = "mistweaver";
                value.specs.mistweaver.desire = desire;
                value.specs.mistweaver.amount = amount;

                value.specs.brewmaster.spec = "brewmaster";
                value.specs.brewmaster.desire = desire;
                value.specs.brewmaster.amount = amount;
                break;

            case PALADIN:

                value.class = "Paladin";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.holy.spec = "holy";
                value.specs.holy.desire = desire;
                value.specs.holy.amount = amount;

                value.specs.protection.spec = "protection";
                value.specs.protection.desire = desire;
                value.specs.protection.amount = amount;

                value.specs.retribution.spec = "retribution";
                value.specs.retribution.desire = desire;
                value.specs.retribution.amount = amount;
                break;

            case PRIEST:

                value.class = "Priest";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.shadow.spec = "shadow";
                value.specs.shadow.desire = desire;
                value.specs.shadow.amount = amount;

                value.specs.holy.spec = "holy";
                value.specs.holy.desire = desire;
                value.specs.holy.amount = amount;

                value.specs.discipline.spec = "discipline";
                value.specs.discipline.desire = desire;
                value.specs.discipline.amount = amount;
                break;

            case ROGUE:

                value.class = "Rogue";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.subtlety.spec = "subtlety";
                value.specs.subtlety.desire = desire;
                value.specs.subtlety.amount = amount;

                value.specs.combat.spec = "combat";
                value.specs.combat.desire = desire;
                value.specs.combat.amount = amount;

                value.specs.assassination.spec = "assassination";
                value.specs.assassination.desire = desire;
                value.specs.assassination.amount = amount;
                break;

            case SHAMAN:

                value.class = "Shaman";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.enhancement.spec = "enhancement";
                value.specs.enhancement.desire = desire;
                value.specs.enhancement.amount = amount;

                value.specs.restoration.spec = "restoration";
                value.specs.restoration.desire = desire;
                value.specs.restoration.amount = amount;

                value.specs.elemental.spec = "elemental";
                value.specs.elemental.desire = desire;
                value.specs.elemental.amount = amount;
                break;

            case WARLOCK:

                value.class = "Warlock";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.destruction.spec = "destruction";
                value.specs.destruction.desire = desire;
                value.specs.destruction.amount = amount;

                value.specs.affliction.spec = "affliction";
                value.specs.affliction.desire = desire;
                value.specs.affliction.amount = amount;

                value.specs.demonology.spec = "demonology";
                value.specs.demonology.desire = desire;
                value.specs.demonology.amount = amount;
                break;

            case WARRIOR:

                value.class = "Warrior";
                value.anySpec = anySpec;
                value.total = total;

                value.specs.protection.spec = "protection";
                value.specs.protection.desire = desire;
                value.specs.protection.amount = amount;

                value.specs.fury.spec = "fury";
                value.specs.fury.desire = desire;
                value.specs.fury.amount = amount;

                value.specs.arms.spec = "arms";
                value.specs.arms.desire = desire;
                value.specs.arms.amount = amount;

                break;

            default:
                break;
        }
        
    })

    return recruitmentNeeds

}

var recruitment = {
    updateRecruitment: updateRecruitment,
    createRecruitment: createRecruitment,
    getRecruitment: getRecruitment,
}

module.exports = recruitment;
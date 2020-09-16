const axios = require('axios').default;
const { merge } = require('lodash');
const _ = require('lodash');
const util = require('util');

const config = require('./config');


// Destiny 2 manifest 
var manifest = require('./manifest');

var api_controllers = {};


/**
 * Exotic Quest API endpoint contoller
 */
api_controllers.exotic_quests = function (req, res) {

    // _.forEach(config.players, function (player_id) {
    //     getProfile(player_id);
    // });

    getProfile(req.params.player_id, req.params.membership_type ? req.params.membership_type : 3, function (player_data) {
        res.send(player_data);
    });
};


/**
 * Exotic Quest API endpoint contoller
 */
api_controllers.team_exotic_quests = function (req, res) {

    var data = {
        quests: {
            exotic: []
        },
        players: []
    };

    _.forEach(config.players, function (player) {
        getProfile(player.id, player.membership_type, function (player_data) {
            
            data.players.push(player_data);

            _.forEach(player_data.characters, function (character) {
                _.merge(data.quests.exotic, character.quests.exotic);
            });

            if (data.players.length == config.players.length) {
                res.send(data);
            }
        });
    });

};


/**
 * Destiny 2 manifest controller
 */
api_controllers.manifest= function (req, res) {
    
    axios.get(config.request.api_root + '/Manifest/', {
        headers: config.request.header,
    })
    .then(function (response) {
        console.log(response.data.Response.jsonWorldComponentContentPaths.en);
        res.send(response.data.Response)
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);
    })
    .then(function () {
        // always executed
    });
};


/**
 * Retrieves all profiles and with quest data
 * @param {*} profile_id 
 */
function getProfile(profile_id, membership_type, callback) {

    axios.get(config.request.api_root + '/' + membership_type + '/Profile/' + profile_id, {
            headers: config.request.header,
            params: {
                components: 'Profiles,Characters,CharacterInventories'
            }
        })
        .then(function (response) {
            var player = {
                id: response.data.Response.profile.data.userInfo.membershipId,
                displayName: response.data.Response.profile.data.userInfo.displayName,
                characters: []
            };

            var characters = response.data.Response.characters.data;
            var characterInventories = response.data.Response.characterInventories.data;

            // loop through each character
            _.forEach(characters, function (character_profile, character_id) {

                // process character profile
                var proccessed_character = {
                    id: character_profile.characterId,
                    info: {
                        classType: manifest.character.class[character_profile.classType],
                        gender: manifest.character.gender[character_profile.genderType],
                        race: manifest.character.race[character_profile.raceType],
                        emblem_image: config.request.media_root + character_profile.emblemPath
                    },
                    stats: {
                        dateLastPlayed: character_profile.dateLastPlayed,
                        lightLevel: character_profile.light
                    },
                    quests: {
                        exotic: []
                    }
                }

                // if we were able to read inventory
                if (characterInventories) {
                    // process inventory items
                    var inventory_items = characterInventories[character_id].items;
                    _.forEach(inventory_items, function (item, item_id) {
                        
                        // if item is a quest
                        if (item.bucketHash == '1345459588') {
                            var quest = manifest.items.exotic_quests[item.itemHash];

                            // if quest is exotic
                            if (quest) {
                                proccessed_character.quests.exotic.push(quest);
                            }
                        }
                    });
                }

                player.characters.push(proccessed_character);
            });

            // process quests if we have inventory
            if (characterInventories) player.characters = processQuests(player.characters);

            callback(player);

            console.log(util.inspect(player, {showHidden: false, depth: null}));
        })
        .catch(function (error) {
            console.log('error: ' + profile_id, error);
        })
        .then(function () {
            // always executed
    });
}


/**
 * Processes quest steps and looks up parent quest lines
 * @param {*} player_characters 
 */
function processQuests (player_characters) {

    // process quests for each character
    _.forEach(player_characters, function (character) {
        
        var quest_data = [];

        // process quests
        _.forEach(character.quests.exotic, function (quest) {

            var processed_quest = {};

            // new quests have quest line data in 'setData'
            // if (quest.setData) {
            //     processed_quest.id = quest.hash;
            //     processed_quest.name = quest.setData.questLineName;
            // }
            // old quest have quest line data tied to 'questlineItemHash'
            //else {
                // if quest has a quest line, use that data
                if (quest.objectives && quest.hash != quest.objectives.questlineItemHash && quest.objectives.questlineItemHash != 0) {
                    var quest_line = manifest.items.exotic_quests[quest.objectives.questlineItemHash]
                    processed_quest.id = quest_line.hash;
                    processed_quest.name = quest_line.displayProperties.name;
                    processed_quest.icon_image = config.request.media_root + quest_line.displayProperties.icon;
                } else {
                    processed_quest.id = quest.hash;
                    processed_quest.name = quest.displayProperties.name
                    processed_quest.icon_image = config.request.media_root + quest.displayProperties.icon;
                }
            //}

            quest_data.push(processed_quest);
        });

        character.quests.exotic = quest_data;
    });

    return player_characters;
}


module.exports = api_controllers;
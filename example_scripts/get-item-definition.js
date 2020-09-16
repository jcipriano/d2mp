const axios = require('axios').default;
const oauth = require('axios-oauth-client');
const _ = require('lodash');
const util = require('util');

const config = require('../config');
config.request.header = { 'X-API-Key': '17d6ebda2330433c82588e043e4974bb'}
/**
 * Retrieves item definition from API instead of manifest
 * @param {*} item_id 
 */
function getItemDefinition(item_id) {

    axios.get(config.request.api_root + '/Manifest/DestinyInventoryItemDefinition/' + item_id, {
        headers: config.request.header,
    })
    .then(function (response) {
        console.log(response.data.Response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

getItemDefinition('1306722632');
const axios = require('axios').default;
const oauth = require('axios-oauth-client');
const _ = require('lodash');

const API_CLIENT_ID = 34055;
const API_KEY = '17d6ebda2330433c82588e043e4974bb';
const API_ROOT = 'https://www.bungie.net/Platform/Destiny2';
const MEDIA_ROOT = 'https://www.bungie.net';


axios.get(API_ROOT + '/SearchDestinyPlayer/-1/alphaqup/', {
    headers: {
        "X-API-Key": API_KEY
    }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  // j00k - 4611686018500974539
  // straega - 4611686018501333995
  // AlphaQUhp - 4611686018482757262
  // Zuch - 4611686018500791548
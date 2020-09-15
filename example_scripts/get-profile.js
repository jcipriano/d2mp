const axios = require('axios').default;
const oauth = require('axios-oauth-client');
const _ = require('lodash');
const util = require('util');

const config = require('./config');

axios.get(config.request.api_root + '/3/Profile/4611686018500791548', {
    headers: config.request.header,
    params: {
        components: 'Profiles,Characters,CharacterInventories'
    }
})
.then(function (response) {
    console.log(util.inspect(response.data.Response.characterInventories.data, {showHidden: false, depth: null}));
})
.catch(function (error) {
    console.log(util.inspect(error, {showHidden: false, depth: null}));
})
.then(function () {
    // always executed
});
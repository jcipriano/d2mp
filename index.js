const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const axios = require('axios').default;
const oauth = require('axios-oauth-client');
const _ = require('lodash');

const config = require('./config');

var app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


/**
 * Index page of webapp
 */
app.get('/', function (req, res) {
  res.render('pages/index')
});


/**
 * Exotic Quest Coordinator View
 */
app.get('/eqc', function (req, res) {
  res.render('pages/index')
});

var api_controllers = require('./api-controllers');


/**
 * Exotic Quest API endpoint
 */
app.get('/api/:membership_type/players/:player_id/quests/exotic', api_controllers.exotic_quests);


/**
 * Displays Destiny 2 manifest URLs
 */
app.get('/api/manifest', api_controllers.manifest);


/**
 * Filters inventory manifest for exotic quests
 */
var manifest_items = require('./manifests/DestinyInventoryItemDefinition');
app.get('/manifest/exotic-quests', function (req, res) {
  
  var pursuits = {};

  _.forEach(manifest_items, function (item, key) {
    console.log(item.inventory.bucketTypeHash);
    if ((item.inventory.bucketTypeHash == '1345459588' || item.inventory.bucketTypeHash == '2422292810') && _.indexOf(item.traitIds, 'quest.exotic') > -1) {
      pursuits[key] = item;
    }
  });

  res.send(pursuits);
})

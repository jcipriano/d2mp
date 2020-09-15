var manifest = {};

manifest.character = {
  class: ['titan', 'hunter', 'warlock'],
  gender: ['male', 'female'],
  race: ['human', 'awoken', 'exo']
}

manifest.items = {
  exotic_quests: require('./manifests/DestinyExoticQuestsDefinition')
}

module.exports = manifest;

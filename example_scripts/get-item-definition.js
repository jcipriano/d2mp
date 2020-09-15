/**
 * Retrieves item definition from API instead of manifest
 * @param {*} item_id 
 */
function getItemDefinition(item_id) {

    axios.get(request_config.api_root + '/Manifest/DestinyInventoryItemDefinition/' + item_id, {
        headers: request_config.header,
    })
    .then(function (response) {
        console.log(response.data.Response.displayProperties.name);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}
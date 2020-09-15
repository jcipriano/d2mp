module.exports = {

    // request config data
    request: {
        api_root: 'https://www.bungie.net/Platform/Destiny2',
        media_root: 'https://www.bungie.net',
        header: { 'X-API-Key': process.env.API_KEY }
    },
    // player IDs
    players: [
        {
            membership_type: 2,
            id: '4611686018430483874' // R3DB71ND
        },
        {
            membership_type: 3,
            id: '4611686018500974539' // j00k
        },
        {
            membership_type: 3,
            id: '4611686018501333995' // Straega
        },
        {
            membership_type: 3,
            id: '4611686018482757262' // AlphaQUhp
        },
        {
            membership_type: 3,
            id: '4611686018500791548' // Zuch
        }
    ]
}
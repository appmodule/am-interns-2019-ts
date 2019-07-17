'use strict';
require('dotenv').config()

//const fs = require('fs')
// Create a readable stream from a URL
//const strone = "***REMOVED***"
//const strtwo = "***REMOVED***"

const getChannels = require('./database/channels.js').getChannels
const variants = require('./database/variants.js')
const getVariants = require('./hls/index.js').getVariants

async function main() {
    const channels = await getChannels()

    let vars = []
    for (let channel of channels) {
        vars = vars.concat(await getVariants(channel.uri, channel.id))
    }

    vars = await variants.linkToDatabase(vars)
    console.log(vars)

}

main()





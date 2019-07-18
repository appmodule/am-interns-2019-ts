'use strict';
require('dotenv').config()

//const fs = require('fs')
// Create a readable stream from a URL
//const strone = "http://streams.appmodule.net/output5/rtsun_hd/track_0_900/playlist.m3u8"
//const strtwo = "http://streams.appmodule.net/output5/rtsun_hd/playlist.m3u8"

const getChannels = require('./database/channels.js').getChannels
const variants = require('./database/variants.js')
const getVariants = require('./hls/index.js').getVariants
const {VariantDownloader} = require('./hls/VariantDownloader.js')
const ensureExistsDir = require('./util.js').ensureExistsDir

async function main() {
    if (!process.env.FILE_SERVER) {
        throw "NO FILESERVER VARIABLE"
    }

    const channels = await getChannels()

    let vars = []
    for (let channel of channels) {
        vars = vars.concat(await getVariants(channel.uri, channel.id))
    }

    vars = await variants.linkToDatabase(vars)
    console.log(vars)

    ensureExistsDir("files")
    let downloaders = []
    for (let variant of vars) {
        downloaders.push(new VariantDownloader(variant))
    }

}

main()





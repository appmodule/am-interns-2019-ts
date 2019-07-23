'use strict';
require('dotenv').config()

const getChannels = require('./database/channels.js').getChannels
const channelDownloader = require('./hls/ChannelDownloader.js')
const ensureExistsDir = require('./util.js').ensureExistsDir

async function main() {
    ensureExistsDir("files")
    const channels = await getChannels()

    for (let channel of channels) {
        channelDownloader(channel.uri, channel.id)
    }

}
main()

const removeOldChunks = require('./database/channels.js').removeOldChunks
const tenMinutes = 10*60*1000
setInterval(removeOldChunks, tenMinutes)
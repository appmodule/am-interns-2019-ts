'use strict';
require('dotenv').config()

const getChannels = require('./database/channels.js').getChannels
const channelDownloader = require('./hls/ChannelDownloader.js')

async function main() {

    const channels = await getChannels()

    for (let channel of channels) {
        channelDownloader(channel.uri, channel.id)
    }
}

main()
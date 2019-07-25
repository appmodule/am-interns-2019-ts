'use strict';
require('dotenv').config()

const getChannels = require('./database/channels.js').getChannels
const channelDownloader = require('./hls/ChannelDownloader.js')
const ensureExistsDir = require('./util.js').ensureExistsDir
const updateVariant = require('./hls/ChannelDownloader.js').updateVariant

const mapOfChannels = new Map()

async function main() {
    ensureExistsDir("files")
    const channels = await getChannels()

    for (let channel of channels) {
        channelDownloader(channel.uri, channel.id)
        mapOfChannels.set(channel.uri,channel);

    }

}
main()

const removeOldChunks = require('./database/channels.js').removeOldChunks
const tenMinutes = 10*60*1000
setInterval(removeOldChunks, tenMinutes)

async function downloadNewChannels()
{
    const channels = await getChannels()
    for(let channel of channels)
    {
        if(!mapOfChannels.has(channel.uri))
        {
            channelDownloader(channel.uri, channel.id)
            mapOfChannels.set(channel.uri,channel)
        }
        else
        {
            updateVariant(channel.uri,channel.id)
        }

        
    }
}

const minut = 60*1000
setInterval(downloadNewChannels,minut)

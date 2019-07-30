'use strict'

const getChannels = require('../database/channels.js').getChannels
const ChannelDownloader = require('./ChannelDownloader.js')
const ensureExistsDir = require('../util.js').ensureExistsDir

class MultiChannelDownloader {
    constructor() {
        this.channelDownloaders = new Map()
        ensureExistsDir(process.env.TS_FILES+"files")
    }

    async reloadFromDatabase() {
        const channels = await getChannels()
        this._syncDownloaders(channels)
    }

    _syncDownloaders(channels) {
        this.channelDownloaders.forEach((v,k,map) => {
            v.marked = "unmarked"
            map[k] = v
        })
        for (let channel of channels) {
            if (!channel.disabled) {
                if (!this.channelDownloaders.has(channel.uri)) {
                    const cd = new ChannelDownloader(channel)
                    cd.reloadFromDatabase()
                    this.channelDownloaders.set(channel.uri, {
                        channelDownloader: cd,
                        marked: "new",
                    })
                } else {
                    this.channelDownloaders.set(channel.uri, {
                        channelDownloader: this.channelDownloaders.get(channel.uri).channelDownloader,
                        marked: "seen"
                    })
                }
            }
        }
        this.channelDownloaders.forEach((v,k,map) => {
            if (v.marked === 'unmarked') {
                v.channelDownloader.stop()
                map.delete(k)
            } else if (v.marked == "seen") {
                v.channelDownloader.reloadFromDatabase()
            }
        })
    }
}

module.exports = MultiChannelDownloader
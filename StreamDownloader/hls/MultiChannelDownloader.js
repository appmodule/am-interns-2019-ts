'use strict'

const getChannels = require('../database/channels.js').getChannels
const ChannelDownloader = require('./ChannelDownloader.js')
const ensureExistsDir = require('../util.js').ensureExistsDir
const config = require('../config.js')

class MultiChannelDownloader {
    constructor() {
        this.channelDownloaders = new Map()
        ensureExistsDir(process.env.TS_FILES+"files")
    }

    async reloadFromDatabase() {
        try {
            const channels = await getChannels()
            this._syncDownloaders(channels)
        } catch (err) {
            console.error(err)
        }
    }

    _syncDownloaders(channels) {
        this.channelDownloaders.forEach((v,k,map) => {
            v.marked = "unmarked"
            map[k] = v
        })
        var channelsWithError = []
        for (let channel of channels) {
            if (!channel.disabled) {
                if (!this.channelDownloaders.has(channel.uri)) {
                    const cd = new ChannelDownloader(channel)
                    cd.reloadFromDatabase().catch(err => {
                        console.error('GRESKA  ', err)
                        channelsWithError.push(channel)
                    })
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
                v.channelDownloader.reloadFromDatabase().catch(err => console.error(err))
            }
        })
        setInterval(function () {
            console.log(channelsWithError)
            for(let channel of channelsWithError) {
                channelsWithError.splice(channelsWithError.indexOf(channel), 1)
                const cd = new ChannelDownloader(channel)
                cd.reloadFromDatabase().catch(err => {
                    console.error('GRESKA  ', err)
                    channelsWithError.push(channel)
                })
            }
        }, config.restartChannelDownloader * 1000)
    }
}

module.exports = MultiChannelDownloader
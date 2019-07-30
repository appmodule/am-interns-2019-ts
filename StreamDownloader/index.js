'use strict';
require('dotenv').config()


const MultiChannelDownloader = require('./hls/MultiChannelDownloader.js')
const downloader = new MultiChannelDownloader()
downloader.reloadFromDatabase()

const removeOldChunks = require('./database/channels.js').removeOldChunks
const tenMinutes = 10*60*1000
setInterval(removeOldChunks, tenMinutes)

const minut = 60*1000
function reload() {
    downloader.reloadFromDatabase()
}
setInterval(reload, minut)
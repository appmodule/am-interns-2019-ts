'use strict';
// require('dotenv').config()


const MultiChannelDownloader = require('./hls/MultiChannelDownloader.js')
const downloader = new MultiChannelDownloader()
downloader.reloadFromDatabase()

const removeOldChunks = require('./database/channels.js').removeOldChunks
const tenMinutes = 10*60*1000
setInterval(removeOldChunks, tenMinutes)

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url == '/reload') {
        downloader.reloadFromDatabase()
    }
    res.end("reload triggered")

});
server.listen(process.env.STREAM_DOWNLOADER_PORT)

'use strict'

require('dotenv').config()

const http = require('http')
const url = require('url')
const fetch = require('node-fetch')

const server = http.createServer((req, resp) => {
    const path = url.parse(req.url).pathname
    
    if (path == '/good') {
        resp.statusCode = 200
        resp.end("nice")
    } else if (path == '/bad') {
        resp.statusCode = 404
        resp.end()
    } else if (path == '/channel/ok.m3u8') {
        resp.statusCode = 200
        resp.setHeader('Content-Type','application/vnd.apple.mpegurl')
        resp.end(`
        #EXTM3U
        #EXT-X-STREAM-INF:BANDWIDTH=100,CODECS="abc" 
        /variant/ok.m3u8
        `)
    } else if (path == '/variant/ok.m3u8') {
        resp.statusCode = 200
        resp.setHeader('Content-Type','application/vnd.apple.mpegurl')
        resp.end(`
        #EXTM3U
        #EXT-X-TARGETDURATION:10
        #EXT-X-VERSION:4
        #EXT-X-MEDIA-SEQUENCE:1
        #EXT-X-PROGRAM-DATE-TIME:2019-07-27T20:44:07Z
        #EXTINF:10 
        /segment/ok.ts
        #EXT-X-ENDLIST
        `)
    } else if (path == '/segment/ok.ts') {
        resp.statusCode = 200
        resp.setHeader('Content-Type','video/mp2t')
        resp.end('pretend this is a video')
    } else {
        resp.statusCode = 404
        resp.end()
    }
})

let base = ""

before(done => {
    server.listen(0,"127.0.0.1",() => {
        base = `http://${server.address().address}:${server.address().port}`
        done()
    })
})

after(done =>
    server.close(done)
)



var assert = require('assert');

describe('http server works', function () {
    it('can fetch a good url', async function () {
        let resp = await fetch(base+"/good")
        assert.equal(await resp.text(), "nice");
    }) 
    it('gets an error for a bad url', async function () {
        let resp = await fetch(base+"/bad")
        assert.equal(resp.status, 404);
    });
});

describe('Channel downloader', function() {
    const channel = require('../../TimeShift/models').channel
    const channelDownloader = require('../hls/ChannelDownloader.js').channelDownloader
    const EventEmitter = require('events')

    beforeEach(async function() {
        await channel.destroy({where : {}})
    })

    function addChannel(id, uri) {
        return channel.create({
            id,
            uri,
            number_failed: 0,
            number_succeded: 0,
            hours_to_record: 24,
            name: "test_chan",
        })
    }

    function eventPromise(emitter, event) {
        return new Promise((resolve,reject) =>
            emitter.once(event, resolve)
        )
    }

    it("can download a single chunk", async function() {
        let c = (await addChannel(1, base+"/channel/ok.m3u8")).dataValues
        let emitter = new EventEmitter()
        channelDownloader(c.uri, c.id, emitter)
        await eventPromise(emitter,'saved_chunk')
        c = (await channel.findByPk(1)).dataValues
        assert.equal(c.number_succeded, 1)
    })
})
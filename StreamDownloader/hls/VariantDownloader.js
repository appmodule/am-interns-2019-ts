'use strict';
const {createReadStream} = require('hlx-file-reader');
const fs = require('fs')
const ensureExistsDir = require('../util.js').ensureExistsDir
const extname = require('path').extname

const lostChunks = require('../../TimeShift/database/variant.js').getNumberOfLostChunks
const addLostChunk = require('../database/lost_chunks.js').addChunk
let mailer = require('../../TimeShift/mailer.js')

const chunk = require('../db/models').saved_chunk

function VariantDownloader(variant) {
    this.variant = variant

    this.dir = `files/${this.variant.id}/`
    ensureExistsDir(process.env.TS_FILES+this.dir)
    
    this.stream = createReadStream(variant.uri, {concurrency: 7}); //concurrency?
    this.stream.on('data',(data) => this.onData(data))

    .on('end', () => {
        console.log(`Done with variant ${this.variant.id}`);
    })
    .on('error', err => {
        this.onError(err)
    });
    //setTimeout(() => this.stop(),2000)
}

VariantDownloader.prototype.stop = function()
{
    this.stream.removeListener("data",this.onData)
    console.log("ending stream")
    this.stream._cancelAll()
    this._deleteVariantFiles()
}

VariantDownloader.prototype.onData = function(data)
{
    if (data.type === 'playlist') {
    console.log(`${data.isMasterPlaylist ? 'Master' : 'Media'} playlist`);
    }
    if (data.type === 'segment') {
        this.onSegment(data)
    }
}

VariantDownloader.prototype.onSegment = async function(segment) {
    console.log(`Variant #${this.variant.id} Segment #${segment.mediaSequenceNumber}: \
                 duration = ${segment.duration}, byte length = ${segment.data.length}`);

    let extension = extname(segment.uri)
    let filename = segment.mediaSequenceNumber + extension
    let path = this.dir + filename

    let writeStream = fs.createWriteStream(process.env.TS_FILES+path)
    writeStream.on('error',this.onError)
    writeStream.write(segment.data)
    writeStream.end()

    var chunk = {
        variant_id: this.variant.id,
        filepath: path,
        duration: segment.duration,
        timestamp: segment.programDateTime,
        media_sequence: segment.mediaSequenceNumber,
    }
    
    try {
        const addChunk = require('../database/saved_chunks.js').addChunk
        const incrementNumberSucceded = require('../database/channels.js').incrementNumberSucceded
        await incrementNumberSucceded(this.variant.channel_id)
        await addChunk(chunk)
    } catch (err) {
        console.log(err)
    }
}


VariantDownloader.prototype.onError = async function(err) {
    console.log(`Error with variant ${this.variant.id}`)
    console.log(err)
    var chunk = {
        variant_id: this.variant.id,
        start: new Date()
    }
    const incrementNumberFailed = require('../database/channels.js').incrementNumberFailed
    await addLostChunk(chunk)
    await incrementNumberFailed(this.variant.channel_id)

    let l = await lostChunks(this.variant.id)
    if (l > 10) //po dogovoru moze bilo koji broj
    {
        mailer.send('appModule123@gmail.com','Lost chunks','Number of lost chunks is reached 10')
    }
    setTimeout(() => new VariantDownloader(this.variant), 10000)
}

VariantDownloader.prototype._deleteVariantFiles = async function() {
    let where = {
        where : {
            variant_id : this.variant.id
        }
    }
    let to_delete = await chunk.findAll(where)            
    await chunk.destroy(where)
    
    const fs = require('fs')
    for (let c of to_delete) {
        let path = process.env.TS_FILES + c.dataValues.filepath 
        if (fs.existsSync(path)) {
            fs.unlinkSync(path)
        }
    }
    let dirpath = process.env.TS_FILES + "files/" + this.variant.id 
    fs.rmdirSync(dirpath)
}

module.exports =  VariantDownloader 

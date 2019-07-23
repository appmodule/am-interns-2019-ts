'use strict';
const {createReadStream} = require('hls-stream');
const fs = require('fs')
const ensureExistsDir = require('../util.js').ensureExistsDir
const extname = require('path').extname

function VariantDownloader(variant) {
    this.variant = variant

    this.dir = `files/${this.variant.id}/`
    ensureExistsDir(this.dir)
    
    this.stream = createReadStream(variant.uri, {concurrency: 7}); //concurrency?

    this.stream.on('data', data => {
        if (data.type === 'segment') {
            const segment = data;
            console.log(`Variant #${this.variant.id} Segment #${segment.mediaSequenceNumber}: duration = ${segment.duration}, byte length = ${segment.data.length}`);
            let extension = extname(segment.uri)
            let filename = segment.mediaSequenceNumber
            
            filename = filename + extension
            let path = this.dir + filename
            fs.createWriteStream(path).write(segment.data)
            let file_server = process.env.FILE_SERVER

            var chunk = {
                variant_id: variant.id,
                filepath: path,
                duration: segment.duration,
                timestamp: segment.programDateTime,
                media_sequence: segment.mediaSequenceNumber,
            }
           
            try {
                const addChunk = require('../database/saved_chunks.js').addChunk
                if (process.env.FILE_SERVER)
                    addChunk(chunk)
            } catch (err) {
                console.log(err)
            }
        }
    })
    .on('end', () => {
        console.log(`Done with variant ${this.variant.id}`);
    })
    .on('error', err => {
        console.log(`Error with variant ${variant.id}`)
        console.log(err)
        console.error(err.stack);
        const addChunk = require('../database/lost_chunks.js').addChunk
        var chunk = {
            variant_id: variant.id,
            start: new Date()
        }
        addChunk(chunk)
    });
}

module.exports = { VariantDownloader }
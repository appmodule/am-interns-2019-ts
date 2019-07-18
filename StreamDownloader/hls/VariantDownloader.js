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
            if (extension) 
                filename = filename + "." + extension
            let path = this.dir + filename
            fs.createWriteStream(path).write(segment.data)
        }
    })
    .on('end', () => {
        console.log(`Done with variant ${this.variant.id}`);
    })
    .on('error', err => {
        console.log(`Error with variant ${variant.id}`)
        console.log(err)
        console.error(err.stack);
    });
}

module.exports = { VariantDownloader }
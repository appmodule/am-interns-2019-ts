'use strict';

const {parse} = require('hls-parser');
const fetch = require('node-fetch');
const {URL} = require('url')

const variants = require('../database/variants.js')
const VariantDownloader = require('./VariantDownloader.js')

function mergeUri(baseUri, addedUri) {
    return new URL(addedUri, baseUri).toString()
}

class ChannelDownloader {
    constructor(channel) {
        this.channel = channel
        this.variantDownloaders = new Map()
    }

    async reloadFromDatabase() {
        let vars = await this._getVariants()
        this._syncDownloaders(vars)
    }

    async _getVariants() {
        try{
            const playlist_text = await fetch(this.channel.uri).then(rsp => rsp.text())
            const parsed_playlist = parse(playlist_text)
            let vars = parsed_playlist.variants
            vars = vars.map((variant) => {
                return { 
                    channel_id: this.channel.id,
                    uri : mergeUri(this.channel.uri, variant.uri),
                    bandwidth : variant.bandwidth,
                    codecs: variant.codecs,
                }
            })
            return await variants.linkToDatabase(vars)
        }  catch(e) {
            console.log(e.message)
            return []
        }
    }

    _syncDownloaders(vars) {
        this.variantDownloaders.forEach((v,k,map) => {
            v.marked = "unmarked"
            map[k] = v
        })
        for (let variant of vars) {
            if (!variant.disabled) {
                if (!this.variantDownloaders.has(variant.uri)) {
                    this.variantDownloaders.set(variant.uri, {
                        variantDownloader: new VariantDownloader(variant),
                        marked: "new",
                    })
                } else {
                    this.variantDownloaders.set(variant.uri, {
                        variantDownloader: this.variantDownloaders.get(variant.uri).variantDownloader,
                        marked: "seen"
                    })
                }
            }
        }
        this.variantDownloaders.forEach((v,k,map) => {
            if (v.marked === 'unmarked') {
                v.variantDownloader.stop()
                map.delete(k)
            }
        })
    }

    stop() {
        this.variantDownloaders.forEach(v => {
            v.variantDownloader.stop()
        })
        this.variantDownloaders = new Map()
    }
}
/*
async function deleteVariantsOfChannel(id)
{
    let where = {
        where : {
            channel_id : id
        }
    }
    let to_delete = await variant.findAll(where)            
    //let num_deleted = await chunk.destroy(where)
    
    const fs = require('fs')
    for (let v of to_delete) {
        deleteChunksOfVariant(v.dataValues.id)
    }
}
*/

module.exports = ChannelDownloader

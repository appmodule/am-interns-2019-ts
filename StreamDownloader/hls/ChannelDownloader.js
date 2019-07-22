'use strict';

const {parse} = require('hls-parser');
const fetch = require('node-fetch');
const {URL} = require('url')

const variants = require('../database/variants.js')
const {VariantDownloader} = require('./VariantDownloader.js')

function mergeUri(baseUri, addedUri) {
    return new URL(addedUri, baseUri).toString()
}

async function getVariants(channel_uri, channel_id) {
    try{
        const playlist_text = await fetch(channel_uri).then(rsp => rsp.text())
        const parsed_playlist = parse(playlist_text)
        const variants = parsed_playlist.variants
        return variants.map((variant) => {
            return { 
                channel_id: channel_id,
                uri : mergeUri(channel_uri, variant.uri),
                bandwidth : variant.bandwidth,
                codecs: variant.codecs,
            }
        })
    }  catch(e) {
        console.log(e.message)
        return []
    }
}

async function channelDownloader(channel_uri, channel_id) {
    let vars = await getVariants(channel_uri, channel_id)
    vars = await variants.linkToDatabase(vars)

    for (let variant of vars) {
        new VariantDownloader(variant)
    }
}

module.exports = channelDownloader 
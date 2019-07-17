'use strict';

const {parse} = require('hls-parser');
const fetch = require('node-fetch');
const {URL} = require('url')

function mergeUri(baseUri, addedUri) {
    return new URL(addedUri, baseUri).toString()
}

async function getVariants(channel_uri, channel_id) {
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
}

module.exports.getVariants = getVariants

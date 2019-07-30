'use strict';

const {parse} = require('hls-parser');
const fetch = require('node-fetch');
const {URL} = require('url')

const variants = require('../database/variants.js')
const getChannel = require('../database/channels.js').getChannel
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

const mapOfVariants = new Map()

async function channelDownloader(channel_uri, channel_id) {
    let vars = await getVariants(channel_uri, channel_id)
    console.log(channel_uri, channel_id)
    vars = await variants.linkToDatabase(vars)

    for (let variant of vars) {
        if(!variant.disabled)
        {
            let vd = new VariantDownloader(variant)
            mapOfVariants.set(variant.id,vd)
        }
    }
}
async function stopChannelDownloading(channel_uri, channel_id) {
    let vars = await getVariants(channel_uri, channel_id)
    //console.log(channel_uri, channel_id)
    vars = await variants.linkToDatabase(vars)
    for (let variant of vars) {
        let vd = mapOfVariants.get(variant.id)
        vd.stop()
        mapOfVariants.delete(variant.id)
    }
}
async function restartDownloading(channel_uri,channel_id)
{
    let vars = await getVariants(channel_uri, channel_id)
    console.log(channel_uri, channel_id)
    vars = await variants.linkToDatabase(vars)
    for (let variant of vars) {
        let vd = new VariantDownloader(variant)
        mapOfVariants.set(variant.id,vd)
    }
}
async function updateChannel(id,newValue)
{
    try{
        let c = await getChannel(id)
        if (newValue === true)
            await stopChannelDownloading(c.uri,id)
        else
            await restartDownloading(c.uri,id)
    }
    catch(err)
    {
        console.error(err)
    }
    
//updateChannel(24,false)
async function updateVariants(channel_uri,channel_id)
{

    let vars = await getVariants(channel_uri, channel_id)
    vars = await variants.linkToDatabase(vars)
    for(let variant of vars)
    {
        if(!mapOfVariants.has(variant.id) && variant.disabled === false)
        {
            let vd = new VariantDownloader(variant)
            mapOfVariants.set(variant.id,vd)
        }
        else
        if(mapOfVariants.has(variant.id) && variant.disabled === true)
        {
            let vd = mapOfVariants.get(variant.id)
            vd.stop()
            mapOfVariants.delete(variant.id)
        }
    }
}

module.exports = {
    channelDownloader,
    updateVariants,
    updateChannel
}
'use strict';

const {parse} = require('hls-parser');
const fetch = require('node-fetch');
const {URL} = require('url')

const variants = require('../database/variants.js')
const getChannel = require('../database/channels.js').getChannel
const {VariantDownloader} = require('./VariantDownloader.js')
const chunk = require('../db/models').saved_chunk
const variant = require('../db/models').variant

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
        deleteVariantsOfChannel(channel_id)
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
            deleteChunksOfVariant(variant.id)
        }
    }
}

async function deleteChunksOfVariant(id)
{
    let where = {
        where : {
            variant_id : id
        }
    }
    let to_delete = await chunk.findAll(where)            
    let num_deleted = await chunk.destroy(where)
    
    const fs = require('fs')
    for (let c of to_delete) {
        let path = "/" + c.dataValues.filepath 
        //console.log(path)
        if (fs.existsSync(path)) {
            fs.unlinkSync(path)
            
            }
            
    }
    let dirpath = "/files/" + id 
    fs.rmdirSync(dirpath)
    //const fse = require('fs-extra')
    //fse.removeSync(dirpath)
}
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


module.exports = {
    channelDownloader,
    updateVariants,
    updateChannel,
    deleteChunksOfVariant,
    deleteVariantsOfChannel
}

async function main()
{
    await deleteVariantsOfChannel(24)
}

main()
'use strict';
const channel = require('../../TimeShift/database/channel.js')

async function getChannels() {
    
    return channel.getChannels()
}

const db_variant = require('../../TimeShift/database/variant.js')
const chunk = require('../db/models').saved_chunk
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function incrementNumberSucceded(channelId)
{
    return channel.incrementNumberSucceded(channelId)
}

async function incrementNumberFailed(channelId)
{
    return channel.incrementNumberFailed(channelId)
}

async function createChannel(channel)
{
    return channel.createChannel(channel)
}
async function getChannel(id)
{
    return channel.getChannel(id)
}

async function removeOldChunks() {
    try {
        let channels = await getChannels()
        for (let c of channels) {
            
            let delete_from = new Date()
            delete_from.setHours(delete_from.getHours()-c.hours_to_record)
            console.log(delete_from)
            let variants = await db_variant.getVariants(c.id)
            for (let v of variants) {
                let where = {
                    where : {
                        variant_id : v.id,
                        createdAt : {
                            [Op.lt]: delete_from
                        }
                    }
                }
                
                let to_delete = await chunk.findAll(where)            
                let num_deleted = await chunk.destroy(where)
                console.log("Deleted old chunks: " + num_deleted)
                const fs = require('fs')
                for (let c of to_delete) {
                    let path = c.dataValues.filepath
                    if (fs.existsSync(process.env.TS_FILES+path)) {
                        fs.unlinkSync(process.env.TS_FILES+path)
                        console.log("Deleting file "+ path)
                    }
                }
            }
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports.getChannels = getChannels
module.exports.removeOldChunks =  removeOldChunks
module.exports.incrementNumberSucceded = incrementNumberSucceded
module.exports.incrementNumberFailed = incrementNumberFailed
module.exports.getChannel = getChannel

'use strict';
const channel = require('../../TimeShift/database/channel.js')

async function getChannels() {
    
    return channel.getChannels()
}

const db_variant = require('../../TimeShift/database/variant.js')
const chunk = require('../../TimeShift/models').saved_chunk
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

async function removeOldChunks() {
    try {
        let channels = await getChannels()
        for (let c of channels) {
            let delete_from = new Date((new Date()).setHours(-c.hours_to_record))
            console.log(delete_from)
            let variants = await db_variant.getVariants(c.id)
            for (let v of variants) {
                let where = {
                    where : {
                        variant_id : v.id,
                        timestamp : {
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
                    if (!fs.existsSync(path))
                        fs.unlinkSync(path)
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

incrementNumberSucceded(1)
incrementNumberFailed(1)
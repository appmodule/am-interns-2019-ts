'use strict'
const variant = require('../db/models').variant
const lost_chunk = require('../db/models').lost_chunk

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = 
{
    async getVariants () 
    {
        let res = await variant.findAll({})
        
        let variants = []
        res.forEach(v => {
            variants.push(v.dataValues)
        })
        return variants
    },

    async getVariants (channelID) 
    {
        let res = await variant.findAll({where: {channel_id : channelID}})
        
        let variants = []
        res.forEach(v => {
            variants.push(v.dataValues)
        })
        return variants
    },

    async getVariant(id)
    {
        let variantReturn = await variant.findOne({where: {id}})
        return variantReturn.dataValues;
    },

    updateVariant(id,disabled)
    {
        return variant.update({disabled:disabled},{where : {id:id}})
    },

    createVariant(v)
    {
        return variant.create(v);
    },

    deleteVariant(id)
    {
        return variant.destroy({where: {id}});
    },
    
    async getNumberOfLostChunks(variantId)
    {
        let retval = await lost_chunk.findAll({attributes: [[Sequelize.fn('count', Sequelize.col('variant_id')), 'count']],where: {variant_id:variantId},group : ['variant_id']})

        if(!retval[0])
            return 0
        return retval[0].dataValues.count
    }

}
 /*async function main1()
{
    let db = require('./variant.js')
    //let c= await db.getNumberOfLostChunks(2)
    for(var i=2;i<5;i++)
    {
        db.updateVariant(i,true)
    }
    for(var i=16;i<25;i++)
    {
        db.updateVariant(i,true)
    }
    
    console.log(c)
}

main1()*/
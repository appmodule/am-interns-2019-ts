const channel = require('../models').channel
const variant = require('../models').variant
const saved_chunk = require('../models').saved_chunk

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
    }

    
}

async function main() {
    var db = require('./variant.js');
    //var v = await db.getVariants()
    //var v = await db.getVariant(1)
    //console.log(v);
    //await db.updateVariant(1,true)
    /*var v = 
    {
        codecs: 'avc1.42001f,mp4a.40.2',
        bandwidth: 2339692,
        channel_id: 1,
        uri: 'http://streams.appmodule.net/output5/rtsun_hd/track_1_2000/playlist.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    db.createVariant(v);*/
    //db.deleteVariant(5)
    //var v = await db.getVariants(1);
    //console.log(v);
   
}

main()
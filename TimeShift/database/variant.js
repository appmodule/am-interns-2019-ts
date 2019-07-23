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
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

    async getVariant(id)
    {
        let variantReturn = await variant.findOne({where: {id}})
        return variantReturn.dataValues;
    },

    async updateVariant(id,disabled)
    {
        variant.update({disabled:disabled},{where : {id:id}})
    }

    
}

async function main() {
    var db = require('./variant.js');
    //var v = await db.getVariants()
    //var v = await db.getVariant(1)
    //console.log(v);
    await db.updateVariant(1,true)
}

main()
'use strict'
const lost_chunk = require('../models').lost_chunk

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    getChunk(id) {
        return lost_chunk.findOne({where:{id}})
            .then(res => res.dataValues)  // TODO: return an error when I can't find the chunk
    },
    async getChunks () 
    {
        let res = await lost_chunk.findAll({})
        
        let chunks = []
        res.forEach(v => {
            chunks.push(v.dataValues)
        })
        return chunks
    },
    createChunk(chunk) {
        return lost_chunk.create(chunk)
    },
    deleteChunk(id) {
        return lost_chunk.destroy({where: {id}})
    },
}
'use strict'
const saved_chunk = require('../db/models').saved_chunk

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    getChunk(id) {
        return saved_chunk.findOne({where:{id}})
            .then(res => res.dataValues)  // TODO: return an error when I can't find the chunk
    },
    async getChunks () 
    {
        let res = await saved_chunk.findAll({})
        
        let chunks = []
        res.forEach(v => {
            chunks.push(v.dataValues)
        })
        return chunks
    },
    createChunk(chunk) {
        return saved_chunk.create(chunk)
    },
    deleteChunk(id) {
        return saved_chunk.destroy({where: {id}})
    },
}
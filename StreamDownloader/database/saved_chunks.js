'use strict';

const saved_chunk = require('../../TimeShift/database/saved_chunk.js')


async function addChunk(chunk) {
    return saved_chunk.createChunk(chunk)
}

module.exports.addChunk = addChunk
'use strict';

const saved_chunk = require('../../TimeShift/database/lost_chunk.js')


async function addChunk(chunk) {
    return lost_chunk.createChunk(chunk)
}

module.exports.addChunk = addChunk
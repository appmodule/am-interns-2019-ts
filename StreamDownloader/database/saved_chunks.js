'use strict';

const query = require('./query.js').query
const saved_chunk = require('../../TimeShift/database/saved_chunk.js')


async function addChunk(chunk) {
    return saved_chunk.createChunk(chunk)
}

module.exports.addChunk = addChunk

async function main()
{
    var ch = await addChunk(
        {
            variant_id: 1,
            filepath: "test",
            duration: 8,
            timestamp: new Date(),
            media_sequence: 5

        })
    console.log(ch)

}

main()
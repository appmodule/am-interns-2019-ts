'use strict';

const query = require('./query.js').query



async function addChunk(chunk) {
    const query_text = "INSERT INTO saved_chunks(variant_id,timestamp,filepath,duration) VALUES ($1,$2,$3,$4) RETURNING id;"
    const vals = [chunk.variant_id,chunk.timestamp,chunk.filepath,chunk.duration]
    const id = (await query(query_text,vals)).rows[0].id
    return id
}

module.exports.addChunk = addChunk
'use strict';

const query = require('./query.js').query

async function getChannels() {
    const query_text = "SELECT id, uri, name from channels;"
    const rows = (await query(query_text)).rows
    return rows
}




module.exports.getChannels = getChannels
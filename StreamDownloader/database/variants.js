'use strict';

const query = require('./query.js').query

async function linkToDatabase(variants) {
    const search_query = "SELECT id from variants where \
                                 channel_id = $1 and bandwidth=$2 and codecs=$3 and uri=$4;"
    const add_query = "INSERT INTO variants (channel_id, bandwidth, codecs, uri) \
                              VALUES ($1, $2, $3, $4) RETURNING id"
    for (let variant of variants) {
        const vals = [variant.channel_id, variant.bandwidth, variant.codecs, variant.uri]
        const rows = (await query(search_query, vals)).rows
        if (rows.length == 0) {
            variant.id = (await query(add_query, vals)).rows[0].id
        } else {
            variant.id = rows[0].id
        }
    }
    return variants
}

module.exports.linkToDatabase = linkToDatabase
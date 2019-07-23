'use strict';

const variant = require('../../TimeShift/models').variant

async function linkToDatabase(variants) {
    for (let v of variants) {
        let res = await variant.findOrCreate({
            where : {
                channel_id : v.channel_id,
                bandwidth : v.bandwidth,
                codecs : v.codecs,
                uri : v.uri,
            }
        })
        v.id = res[0].id
    }
    return variants
}

module.exports.linkToDatabase = linkToDatabase
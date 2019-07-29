'use strict';

const variant = require('../db/models').variant

async function linkToDatabase(variants) {
    let vs = []
    for (let v of variants) {
        let res = await variant.findOrCreate({
            where : {
                channel_id : v.channel_id,
                bandwidth : v.bandwidth,
                codecs : v.codecs,
                uri : v.uri,
            }
        })
        vs.push(res[0].dataValues)
    }
    return vs
}

module.exports.linkToDatabase = linkToDatabase
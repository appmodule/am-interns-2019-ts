
'use strict';

const db = require('../database')

module.exports = {
    getVariants: getVariants,
    addVariant: addVariant
};

function getVariants(req, httpRes, next) {
    let channelID = req.swagger.params.channel_id.value;
    db.query('SELECT * FROM variants WHERE channel_id = $1', [channelID]).then(dbRes => {
        httpRes.json(dbRes.rows)
    }).catch(dbErr => {
        next(dbErr)
    })
}

function addVariant(req, httpRes, next) {
    let channel_id = req.swagger.params.channel_id.value;
    let uri = req.swagger.params.uri.value;
    let bandwidth = req.swagger.params.bandwidth.value;
    let codecs = req.swagger.params.codecs.value;
    
    let query_text = 'INSERT INTO variants (channel_id, uri, bandwidth, codecs) VALUES ($1,$2,$3,$4)'
    let values = [channel_id, uri, bandwidth, codecs]
    db.query( query_text , values).then(dbRes => {
        httpRes.json({})
    }).catch(dbErr => {
        next(dbErr)
    })
  }
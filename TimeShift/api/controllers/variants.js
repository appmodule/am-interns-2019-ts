
'use strict';

const db = require('../database')

module.exports = {
    getVariants: getVariants,
    addVariant: addVariant,
    updateVariantFlag: updateVariantFlag
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
  
function updateVariantFlag(req, res1) {
// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
var id = req.swagger.params.id.value;
var flag = req.swagger.params.flag.value;

const db = require('../database')

    db.query('UPDATE variants SET flag=$1 WHERE id=$2', [flag,id], (err, res) => {
        if (err) {
        return err
        }
        res1.json(res.rows[0])
    })
//res.json(hello);
}

  

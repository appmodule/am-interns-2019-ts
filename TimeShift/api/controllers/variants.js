'use strict';

const variants_db = require('../../database/variant.js')

module.exports = {
    getVariants: getVariants,
    addVariant: addVariant,
    updateVariantFlag: updateVariantFlag
};

function getVariants(req, httpRes, next) {
    let channelID = req.swagger.params.channel_id.value;
    variants_db.getVariants(channelID)
                 .then(res => httpRes.json(res))
}

  function addVariant(req, httpRes, next) {
    let channel_id = req.swagger.params.channel_id.value;
    let uri = req.swagger.params.uri.value;
    let bandwidth = req.swagger.params.bandwidth.value;
    let codecs = req.swagger.params.codecs.value;
    
    variants_db.createVariant({channel_id, uri, bandwidth, codecs})
    .then(res => httpRes.json(res))
    .catch(err => next(err))
  }
  
function updateVariantFlag(req, httpRes, next) {
    var params = req.swagger.params
    var id = params.id.value || 0
    var disabled = params.disabled.value || false

    variants_db.updateVariant(id,disabled)
    .then(res => httpRes.json(res))
    .catch(err => next(err))
    
}

  

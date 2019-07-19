//'use strict';

const util = require('util');
const db = require('../database')
const saved_chunks_db = require('../../database/saved_chunk.js')

module.exports = {
  addChunk: addChunk,
  getChunk: getChunk,
  deleteSavedChunk: deleteSavedChunk
};


function getChunk(httpReq, httpRes, next) {
  var id = httpReq.swagger.params.id.value;
  saved_chunks_db.getChunk(id)
                 .then(res => httpRes.json(res))
}

function addChunk(httpReq, httpRes, next) {
  
  var variant_id = httpReq.swagger.params.variant_id.value;
  var filepath = httpReq.swagger.params.filepath.value;
  var duration = httpReq.swagger.params.duration.value;
  var timestamp = new Date();
  saved_chunks_db.createChunk({variant_id, filepath, duration, timestamp})
    .then(res => httpRes.json(res))
    .catch(err => next(err))
}

function deleteSavedChunk(httpReq, httpRes, next)
{
  var id = httpReq.swagger.params.id.value;

  saved_chunks_db.deleteChunk(id)
    .then(res => httpRes.json(res))
    .catch(err => next(err))
}

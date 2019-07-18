//'use strict';

const util = require('util');
const db = require('../database')

module.exports = {
  addChunk: addChunk,
  getChunk: getChunk,
  deleteSavedChunk: deleteSavedChunk
};


function getChunk(httpReq, httpRes, next) {
  var id = httpReq.swagger.params.id.value;


  db.query('SELECT * FROM saved_chunks WHERE id = $1', [id], (err, res) => {
      if (err) {
        next(err)
        return
      }
      httpRes.json(res.rows[0])
  })
}

function addChunk(httpReq, httpRes, next) {
  
  var variant_id = httpReq.swagger.params.variant_id.value;
  var filepath = httpReq.swagger.params.filepath.value;
  var timestamp = new Date();
  var duration = httpReq.swagger.params.duration.value;
  
  var query_string = 'INSERT INTO saved_chunks (variant_id,timestamp,filepath, duration) VALUES ($1,$2,$3,$4) RETURNING *'

  db.query(query_string, [variant_id,timestamp,filepath, duration], (err, res) => { 
    if (err) {
        next(err)
        return
    }
    httpRes.json(res.rows[0])
  })
}

function deleteSavedChunk(httpReq,httpRes)
{
  var id = httpReq.swagger.params.id.value;

  db.query('DELETE FROM saved_chunks WHERE id = $1 RETURNING *', [id],(err, res) => {
    if (err) {
      return err
    }
    httpRes.json(res.rows[0])
  })
}

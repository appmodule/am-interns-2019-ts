//'use strict';

var util = require('util');


module.exports = {
  addChunk: addChunk,
  getChunk: getChunk,
  updateChunkFlag: updateChunkFlag,
  deleteSavedChunk: deleteSavedChunk
};


function getChunk(req, res1) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var id = req.swagger.params.id.value || 'stranger';
    //var hello = util.format('Hello, %s!', id);
  
    const db = require('../database')

        db.query('SELECT * FROM saved_chunks WHERE id = $1', [id], (err, res) => {
            if (err) {
            return err
            }
            res1.json(res.rows[0])
        })
    //res.json(hello);
  }

  function addChunk(req, res1, next) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    
    var variant_id = req.swagger.params.variant_id.value;
    //var timestamp = req.swagger.params.timestamp.value;
    var filepath = req.swagger.params.filepath.value;
    //var timestamp = '2016-06-22 19:10:25-07';
    var timestamp = new Date();
    
  
    const db = require('../database')

    console.log('123')
        db.query('INSERT INTO saved_chunks (variant_id,timestamp,filepath) VALUES ($1,$2,$3) RETURNING *', [variant_id,timestamp,filepath], (err, res) => {
            if (err) {
                console.log("123")
                next(err)
                return
            }
            console.log('jhjh')
            res1.json(res.rows[0])
        })
    //res.json(hello);
  }

  function deleteSavedChunk(req,res1)
  {
    var id = req.swagger.params.id.value;
    const db = require('../database');

    db.query('DELETE FROM saved_chunks WHERE id = $1 RETURNING *', [id],(err, res) => {
      if (err) {
        return err
      }
      res1.json(res.rows[0])
  })
}

  function updateChunkFlag(req, res1) {
    var id = req.swagger.params.id.value;
    //var flag = req.swagger.params.flag.value;
    var flag = 0;

    const db = require('../database')
    var chunk = null;
    db.query('SELECT * FROM saved_chunks WHERE id = $1', [id], (err, res) => {
        if (err) {
        return err
        }
        res1.json(res.rows[0])
        chunk = res.rows[0]
    
        db.query('UPDATE saved_chunks SET id=$1,flag=$2,variant_id=$3,filepath=$4,timestamp=$5 WHERE id=$6', [chunk.id,flag,chunk.variant_id,chunk.filepath,chunk.timestamp,chunk.id], (err, res) => {
            if (err) {
            return err
            }
            res1.json(res.rows[0])
        })
    })
    
    
  }
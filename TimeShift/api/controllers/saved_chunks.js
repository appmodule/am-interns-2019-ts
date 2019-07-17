//'use strict';

var util = require('util');


module.exports = {
  addChunk: addChunk,
  getChunk: getChunk,
  updateChunkFlag: updateChunkFlag
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

  function updateChunkFlag(req, res1) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var id = req.swagger.params.id.value;
    var flag = req.swagger.params.flag.value;
  
    const db = require('../database')

        db.query('UPDATE saved_chunks SET flag=$1 WHERE id=$2', [flag,id], (err, res) => {
            if (err) {
            return err
            }
            res1.json(res.rows[0])
        })
    //res.json(hello);
  }
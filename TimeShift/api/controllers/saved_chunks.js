'use strict';

var util = require('util');


module.exports = {
  addChunk: addChunk,
  getChunk: getChunk
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
    var channel_id = req.swagger.params.channel_id.value;
    var variant_id = req.swagger.params.variant_id.value;
    //var timestamp = req.swagger.params.timestamp.value;
    var filepath = req.swagger.params.filepath.value;
    var timestamp = new Date();
   
    
  
    const db = require('../database')

    console.log('123')
        db.query('INSERT INTO saved_chunks (channel_id,variant_id,timestamp,filepath) VALUES ($1,$2,$3,$4) RETURNING *', [channel_id,variant_id,timestamp,filepath], (err, res) => {
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
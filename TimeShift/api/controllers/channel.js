
module.exports = {
  getChannel: getChannel,
  addChannel: addChannel,
  deleteChannel: deleteChannel
  
};

function getChannel(req, res1)
{
    var id = req.swagger.params.id.value || 'stranger';

    const db = require('../database')
    const fs = require('fs')
    fs.appendFile('./playlist.txt', '#EXTM3U\r\n', function (err) {
      if (err) throw err;
    });
    
        let variant = null;
    
        db.query('SELECT * FROM channels WHERE id = $1', [id], (err, res) => {
            if (err) 
            {
            return err
            }
            var channel = res.rows[0];

            db.query('SELECT * FROM variants WHERE channel_id = $1',[channel.id],(err,res)=>
            {
              if (err)
              {
                return err
              }
              variant = res.rows[0];              
            })

            let variantId = res.rows[0].id;// kako ovde da korisnik odabere

            fs.appendFile('./playlist.txt', '#EXT-X-VERSION:'+variantId+"\r\n", function (err)
            {
              if (err) throw err;
            });
            
            db.query('SELECT * FROM saved_chunks WHERE variant_id = $1 order by timestamp asc',[variantId],(err,res)=>
            {
              if (err)
              {
                return err
              }
              var chunks = res.rows
              res1.json(res.rows)
              const fs = require('fs')

              chunks.forEach(element => 
              {
                let toAppend = "#EXT-X-STREAM-INF:BANDWIDTH="+variant.bandwidth+",CODECS='"+variant.codecs+"'"+element.filepath+"\r\n";
                fs.appendFile('./playlist.txt', toAppend, function (err) 
                {
                  if (err) throw err;
                });
                
              //res1.end('./playlist.txt');
              });
              
            })
        })
  }

  function addChannel(req,res1){

    var uri = req.swagger.params.uri.value;
    var number_failed = req.swagger.params.number_failed.value;
    var number_succeded = req.swagger.params.number_succeded.value;
    var hours_to_record = req.swagger.params.hours_to_record.value;
    var name = req.swagger.params.name.value;
    
    const db = require('../database');

    db.query('INSERT INTO channels(uri,number_failed,number_succeded,hours_to_record,name) VALUES ($1,$2,$3,$4,$5) RETURNING *', [uri,number_failed,number_succeded,hours_to_record,name],(err, res) => {
      if (err) {
        return err
      }
      res1.json(res.rows[0])
  })
  }

  function deleteChannel(req,res1)
  {
    var id = req.swagger.params.id.value;
    const db = require('../database');

    db.query('DELETE FROM channels WHERE id = $1 RETURNING *', [id],(err, res) => {
      if (err) {
        return err
      }
      res1.json(res.rows[0])
  })
}
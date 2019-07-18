
module.exports = {
  getChannel: getChannel,
  addChannel: addChannel,
  deleteChannel: deleteChannel
  
};

function getChannel(req, res1)
{
    var channelId = req.swagger.params.channelId.value || 'stranger';
    const db = require('../database')
    db.query('SELECT * FROM channels WHERE id = $1', [channelId], (err, res) => 
    {
        if (err) 
        {
        return err
        }
        res1.json(res.rows[0])
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
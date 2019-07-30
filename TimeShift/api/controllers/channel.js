
module.exports = {
  getChannel: getChannel,
  addChannel: addChannel,
  deleteChannel: deleteChannel,
  updateChannelFlag: updateChannelFlag

};

const channels_db = require('../../database/channel.js')

function getChannel(req, res, next) {
    const channelId = req.swagger.params.channelId.value
    let response_promise
    console.log(channelId)
    if (!channelId) {
      response_promise = channels_db.getChannels()
    }
    else {
      response_promise = channels_db.getChannel(channelId)
    }
    response_promise
      .then(value => res.json(value))
      .catch(err => next(err))
}

function addChannel(req,res, next) {
  let uri = req.swagger.params.uri.value;
  let number_failed = req.swagger.params.number_failed.value;
  let number_succeded = req.swagger.params.number_succeded.value;
  let hours_to_record = req.swagger.params.hours_to_record.value;
  let name = req.swagger.params.name.value;
 
  channels_db.createChannel(
    {
      uri,
      number_failed,
      number_succeded,
      hours_to_record,
      name,
    }
  ) .then(value => res.json(value))
    .catch(err => next(err))
}


function deleteChannel(req, res, next)
{
  let id = req.swagger.params.id.value;

  channels_db.deleteChannel(id)
    .then(value => res.json(value))
    .catch(err => next(err))
}

function updateChannelFlag(req, httpRes, next) {
  var params = req.swagger.params
  var id = params.id.value || 0
  var disabled = params.disabled.value || false
  console.log("Kontroler")
  channels_db.updateChannelFlag(id,disabled)
  .then(res => httpRes.json(res))
  .catch(err => next(err))
  
}
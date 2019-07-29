const Sequelize = require('sequelize')
const channel = require('../db/models').channel
const Op = Sequelize.Op

module.exports=
{
    async getChannels()
    {
        let res = await channel.findAll({})
        let channels = []
        res.forEach(c=>
            {
                channels.push(c.dataValues)
            })
        return channels;      
    },
    
    async getChannel(id)
    {
        let res = await channel.findOne({
            attributes: ['uri', 'number_failed', 'number_succeded', 'hours_to_record', 'name'],
            where: {
              id
            }
          })
        return res.dataValues;
    },

    updateChannel(channelId,numOfLost,numOfSaved)
    {
        return channel.increment({number_failed:numOfLost, number_succeded:numOfSaved},{where:{id:channelId}});      
    },
     async getChannelId(name){
        let retval = await channel.findOne({attribute:['id'],where: {name:name}})
        return retval.dataValues.id
      },
    createChannel(c)
    {
        return channel.create(c);
    },

    deleteChannel(id)
    {
        return channel.destroy({where: {id}});
    },
    incrementNumberSucceded(channelId){
        return channel.increment('number_succeded',{where:{id:channelId}})
    },
    incrementNumberFailed(channelId){
        return channel.increment('number_failed',{where:{id:channelId}})
    }
}
const channel = require('../models').channel
const variant = require('../models').variant
const saved_chunk = require('../models').saved_chunk

const Sequelize = require('sequelize')
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
        //console.log(res) 
    },

    updateChannel(channelId,numOfLost,numOfSaved)
    {
        return channel.increment({number_failed:numOfLost, number_succeded:numOfSaved},{where:{id:channelId}});      
    },

    createChannel(c)
    {
        return channel.create(c);
    },

    deleteChannel(id)
    {
        return channel.destroy({where: {id}});
    }
}
/*async function main() {
    let c =
        {
            uri: 'bla bla',
            number_failed: 0,
            number_succeded: 0,
            hours_to_record: 72,
            name: 'sport1_sd',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    var db = require('./channel.js')
    //var c1 = db.updateChannel(1,1,1);
    let ret = await db.getChannel(1)
    console.log(ret)
    //const c1 = db.deleteChannel(4)
    //console.log(c);
}

main()*/
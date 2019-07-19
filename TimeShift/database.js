const channel = require('./models').channel
const variant = require('./models').variant
const saved_chunk = require('./models').saved_chunk

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class Database
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
    }

    async getVariants () 
    {
    let res =await variant.findAll({})
        
    let variants = []
    res.forEach(v => {
        variants.push(v.dataValues)
    })
    return variants
    }
}
async function main() {
    
    var db = new Database
    var c = await db.getChannels();
    console.log(c);
    var v = await db.getVariants();
    console.log(v);
}

main()
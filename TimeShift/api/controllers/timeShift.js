//const channel = require('../../models').channel
const channel = require('../../database/channel.js')
const variant = require('../../database/variant.js')
const saved_chunk = require('../../models').saved_chunk

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports=
{
   getChannelFromTo(req,res1)
  {     
        let name = req.swagger.params.name.value || 'stranger';
        let start = req.swagger.params.start.value
        let duration = req.swagger.params.duration.value

        let stringToReturn = '#EXTM3U\r\n';
        stringToReturn+='#EXT-X-VERSION:'+2+"\r\n";
        var channelId;

        async function getId()
        {
            channelId = await channel.getChannelId(name)
            console.log(channelId)
            variant.getVariants(channelId)
            .then(retval=> {retval.forEach(
            element=>
            {
                stringToReturn += "#EXT-X-STREAM-INF:BANDWIDTH="+element.bandwidth+",CODECS=\""+element.codecs+"\""+"\r\n"+"/timeshift/variant?variantId="+element.id+"&start="+encodeURIComponent(start)+"&duration="+encodeURIComponent(duration)+"\r\n"
            }
            ); return stringToReturn } )  
            .then(str=>{
                str+="#EXT-X-ENDLIST"
                res1.end(str,'utf8')
            }) 
        }
        getId(); 
        
  },
  getSelectedVariantFromTo(req,res1)
  {
    
    let variantId = req.swagger.params.variantId.value || 'stranger';
    let start = req.swagger.params.start.value
    let duration = req.swagger.params.duration.value
    
    let stringToReturn = "#EXTM3U\r\n#EXT-X-PLAYLIST-TYPE:VOD\r\n#EXT-X-TARGETDURATION:10\r\n#EXT-X-VERSION:4\r\n#EXT-X-MEDIA-SEQUENCE:0\r\n";
    let to = start+duration;
    saved_chunk.findAll({
        attributes: ['duration', 'filepath'],
        where:{variant_id: variantId,
            timestamp:{
                [Op.and]: {
                    [Op.gte]:start,
                    [Op.lte]: start+duration
                }
            }
        },
        order:[['timestamp','ASC']]  
    })
    .then(retval=>{
        retval.forEach(element=>
        {
            stringToReturn+= "#EXTINF:"+element.duration+"\r\n"+"/"+element.filepath+"\r\n";
        }); return stringToReturn})
        .then(str=>{
            str+="#EXT-X-ENDLIST"
            res1.end(str,'utf8')
            })
    },

    createMediaPlaylistForLiveStreaming(req,res1)
    {
        let variantId = req.swagger.params.variantId.value || 'stranger';

        let stringToReturn = '#EXTM3U\r\n';
        stringToReturn+="#EXT-X-TARGETDURATION:10\r\n"
        stringToReturn+='#EXT-X-VERSION:'+4+"\r\n";
        

        let chunks = saved_chunk.findAll({
            attributes: ['duration', 'filepath','media_sequence'],
            where:{variant_id: variantId,   
            },
            order:[['timestamp','DESC']],
            limit:3
        })
        .then(retv=>
            {
                let arr = retv.map(retv=>retv.dataValues.media_sequence)
                stringToReturn+="#EXT-X-MEDIA-SEQUENCE:"+arr[arr.length-1]+"\r\n"
                return retv
            })
        .then(retval=>
        {
            retval.forEach(element=>
                {
                    stringToReturn+="#EXTINF:"+element.duration+"\r\n"+"/"+element.filepath+"\r\n";
                }); return stringToReturn})
                .then(str=>{
                    //str+="#EXT-X-ENDLIST"
                    res1.end(str,'utf8')
                })
    },

    getChannelsForLiveStreaming(req,res1)
    {
        let variantId = req.swagger.params.variantId.value || 'stranger';

        let stringToReturn = '#EXTM3U\r\n';
        stringToReturn+='#EXT-X-VERSION:'+2+"\r\n";
       
        let retval =  variant.getVariants(variantId)
        .then(retval=> {retval.forEach(
          element=>
          {
            stringToReturn += "#EXT-X-STREAM-INF:BANDWIDTH="+element.bandwidth+",CODECS=\""+element.codecs+"\r\n"+"/timeshift/variant?variantId="+element.id+"\r\n"
          }
          ); return stringToReturn } )  
        .then(str=>{
            res1.end(str,'utf8')
          })  
    }
}

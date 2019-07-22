const channel = require('../../models').channel
const variant = require('../../database/variant.js')
const saved_chunk = require('../../models').saved_chunk

const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports=
{
   getChannelFromTo(req,res1)
  {
        let channelId = req.swagger.params.channelId.value || 'stranger';
        let from = req.swagger.params.from.value
        let to = req.swagger.params.to.value
        let stringToReturn = '#EXTM3U\r\n';
        stringToReturn+='#EXT-X-VERSION:'+2+"\r\n";
       
        let retval =  variant.getVariants(channelId)
        .then(retval=> {retval.forEach(
          element=>
          {
            stringToReturn += "#EXT-X-STREAM-INF:BANDWIDTH="+element.bandwidth+",CODECS=\""+element.codecs+"\""+"\r\n"+"/timeshift/variant?variantId="+element.id+"&from="+encodeURIComponent(from)+"&to="+encodeURIComponent(to)+"\r\n"
            console.log(stringToReturn)
            
          }
          ); return stringToReturn } )  
        .then(str=>{
            res1.end(str,'utf8')
            console.log(str)
          })  
  }
}

/*function getSelectedVariantFromTo(req,res1)
{
    var variantId =  req.swagger.params.variantId.value || 'stranger';
    var from = req.swagger.params.from.value
    var to = req.swagger.params.to.value
    const db = require('../database')

    var stringToReturn = "#EXTM3U\r\n#EXT-X-PLAYLIST-TYPE:VOD\r\n#EXT-X-TARGETDURATION:10\r\n#EXT-X-VERSION:4\r\n#EXT-X-MEDIA-SEQUENCE:0\r\n";

    db.query('SELECT * FROM saved_chunks WHERE variant_id = $1 and timestamp>=$2 and timestamp <=$3 order by timestamp asc',[variantId,from,to],(err,res)=>
    {
        res.rows.forEach(chunk=>
        {
            stringToReturn+= "#EXTINF:"+chunk.duration+"\r\nhttp://"+chunk.filepath+"\r\n";
        })
        stringToReturn+="#EXT-X-ENDLIST"
        res1.end(stringToReturn,'utf8')
            
        console.log(stringToReturn)
        
    })




}*/

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
    var db = require('./timeShift.js')
    var c1 = db.updateChannel(1,1,1);
    db.getChannelFromTo(1)
    console.log(ret)
    const c1 = db.deleteChannel(4)
    console.log(c);
}

main()*/
module.exports = {
    getChannelFromTo: getChannelFromTo,
    getSelectedVariantFromTo: getSelectedVariantFromTo
  };
function getChannelFromTo(req, res1)
{
    var channelId = req.swagger.params.channelId.value || 'stranger';
    var from = req.swagger.params.from.value;
    var to = req.swagger.params.to.value;
    let stringToReturn = '#EXTM3U\r\n';
    stringToReturn+='#EXT-X-VERSION:'+2+"\r\n";
    const db = require('../database')
    let variant = null;
        
        db.query('SELECT * FROM variants WHERE channel_id = $1',[channelId],(err,res)=>
        {
          if (err)
          {
            return err
          }
          res.rows.forEach(variant =>
            {
                stringToReturn += "#EXT-X-STREAM-INF:BANDWIDTH="+variant.bandwidth+",CODECS=\""+variant.codecs+"\""+"\r\n"+"/timeshift/variant?variantId="+variant.id+"&from="+from+"&to="+to+"\r\n"         
            })  
 
          
            res1.end(stringToReturn,'utf8')
            
            console.log(stringToReturn)
    
        })
      
}
function getSelectedVariantFromTo(req,res1)
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




}
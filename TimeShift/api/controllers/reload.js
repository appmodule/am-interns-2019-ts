module.exports=
{
    reload: reload
}

function reload(req,res,next){
    const http = require('http');
    let address = process.env.STREAM_DOWNLOADER
    http.get('http://'+address+'/reload', (resp) => {
     
      // The whole response has been received. Print out the result.
      res.end()
     /* resp.on('end', () => {
        res.end()
      });*/
    
    }).on("error", (err) => {
      next(err)
    });
}
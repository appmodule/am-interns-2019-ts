const {createReadStream} = require('hls-stream');
const fs = require('fs')
// Create a readable stream from a URL
const strone = "http://streams.appmodule.net/output5/rtsun_hd/track_0_900/playlist.m3u8"
const strtwo = "http://streams.appmodule.net/output5/rtsun_hd/playlist.m3u8"
const stream = createReadStream(strtwo, {concurrency: 7});

MIN_BITRATE = 2
stream.on('variants', (variants, cb) => {
  // Choose variants console.log(variants)
  //return cb([0])
  const variantsToLoad = [];
  for (let [index, variant] of variants.entries()) {
    if (variant.bandwidth >= MIN_BITRATE) {
      variantsToLoad.push(index);
    }
  }
  return cb(variantsToLoad);
  // If not specified, all the variants will be loaded.
})
.on('renditions', (renditions, cb) => {
  // Choose renditions
  const renditionsToLoad = [];
  for (let [index, rendition] of renditions.entries()) {
    if (rendition.type === 'AUDIO') {
      renditionsToLoad.push(index);
    }
  }
  return cb(renditionsToLoad);
  // If not specified, all the renditions will be loaded.
})
.on('data', data => {
  // The streams chosen above will be delivered here
  if (data.type === 'playlist') {
    const playlist = data;
    if (playlist.isMasterPlaylist) {
      console.log(`Master playlist`);
    } else {
      console.log(`Media playlist`);
    }
  } else if (data.type === 'segment') {
    const segment = data;
    console.log(`#${segment.mediaSequenceNumber}: duration = ${segment.duration}, byte length = ${segment.data.length}`);
    fs.createWriteStream("files/"+ segment.mediaSequenceNumber).write(segment.data)
  }
})
.on('end', () => {
  // For VOD streams, the stream ends after all data is consumed.
  // For Live streams, the stream continues until the ENDLIST tag.
  console.log('Done');
})
.on('error', err => {
    console.log(err)
  console.error(err.stack);
});

// To emit 'variants' and 'renditions' events again
//stream.updateVariant();
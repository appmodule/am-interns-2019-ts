'use strict';
const channel = require('../../TimeShift/database/channel.js')

async function getChannels() {
    
    return channel.getChannels()
}

module.exports.getChannels = getChannels;

/*async function main()
{
    let c = await getChannels()
    console.log(c)
}

main();*/
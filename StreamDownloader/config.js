var dotenv = require('dotenv')
dotenv.config()
module.exports = {
    restartChannelDownloader: process.env.RESTART_CHANNEL_DOWNLOADER,
    restartVariantDownloader: process.env.RESTART_VARIANT_DOWNLOADER
}
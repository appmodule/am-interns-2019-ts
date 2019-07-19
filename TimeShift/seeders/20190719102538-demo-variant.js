'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('variants', [
      {
        codecs: 'avc1.42001f,mp4a.40.2',
        bandwidth: 2339691,
        channel_id: 1,
        uri: 'http://streams.appmodule.net/output5/rtsun_hd/track_1_2000/playlist.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codecs: 'avc1.420028,mp4a.40.2',
        bandwidth: 4267200,
        channel_id: 1,
        uri: 'http://streams.appmodule.net/output5/rtsun_hd/track_2_4000/playlist.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codecs: 'avc1.42001e,mp4a.40.2',
        bandwidth: 835691,
        channel_id: 1,
        uri: 'http://streams.appmodule.net/output5/sport1_sd/track_0_600/playlist.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codecs: 'avc1.42001f,mp4a.40.2',
        bandwidth: 1523120,
        channel_id: 1,
        uri: 'http://streams.appmodule.net/output5/sport1_sd/track_1_1200/playlist.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

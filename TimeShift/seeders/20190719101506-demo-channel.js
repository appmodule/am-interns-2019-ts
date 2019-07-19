'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channels', [
      {
        uri: 'http://streams.appmodule.net/output5/rtsun_hd/playlist.m3u8',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: 'rtsun_hd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uri: 'http://streams.appmodule.net/output5/sport1_sd/playlist.m3u8',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: 'sport1_sd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uri: 'http://streams.appmodule.net/output5/bbc_entertainment_sd/playlist.m3u8',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: 'bbc_entertainment_sd',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channels', {})
  }
};

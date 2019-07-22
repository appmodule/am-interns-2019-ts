'use strict';
const channel = require('../models').channel

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('variants', [
      {
        id: 1,
        codecs: 'avc1.42001f,mp4a.40.2',
        bandwidth: 2339691,
        channel_id: 1,
        uri: 'http://example.com/a_variant_1.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        codecs: 'avc1.420028,mp4a.40.2',
        bandwidth: 4267200,
        channel_id: 1,
        uri: 'http://example.com/a_variant_2.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        codecs: 'avc1.42001e,mp4a.40.2',
        bandwidth: 835691,
        channel_id: 1,
        uri: 'http://example.com/a_variant_3.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        codecs: 'avc1.42001f,mp4a.40.2',
        bandwidth: 1523120,
        channel_id: 3,
        uri: 'http://example.com/c_variant_1.m3u8',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('variants', {})
  }
};

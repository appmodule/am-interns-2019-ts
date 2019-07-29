'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channels', [
      {
        id: 1,
        uri: 'http://example.com/a_stream.m3u8',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: 'example_a',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        uri: 'http://example.com/b_stream.m3u8',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: 'example_b',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        uri: 'http://example.com/c_stream.m3u8',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: 'example_c',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channels', {})
  }
};

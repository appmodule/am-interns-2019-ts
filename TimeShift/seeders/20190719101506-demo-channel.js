'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('channels', [
      {
        uri: '***REMOVED***',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: '***REMOVED***',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uri: '***REMOVED***',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: '***REMOVED***',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uri: '***REMOVED***',
        number_failed: 0,
        number_succeded: 0,
        hours_to_record: 72,
        name: '***REMOVED***',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('channels', {})
  }
};

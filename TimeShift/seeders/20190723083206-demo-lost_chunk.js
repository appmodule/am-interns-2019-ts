'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoData = []
    let startDate = new Date(2019, 7-1, 19, 12, 30)
    let delta = 8 * 1000
    for (let variant = 1; variant <= 3; variant++) {
      for (let i = 0; i < 10; i++) {
        let date =  new Date(startDate.getTime() + i * delta)
        demoData.push({
          variant_id: variant,
          start: date,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }
    return queryInterface.bulkInsert('lost_chunks', demoData, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lost_chunks', {})
  }
};

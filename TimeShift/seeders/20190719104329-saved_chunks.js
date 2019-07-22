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
          timestamp: date,
          filepath: `files/${variant}/${i}.ts`,
          duration: 8.0,
          variant_id: variant,
          createdAt: new Date(),
          updatedAt: new Date(),
          media_sequence: i
        })
      }
    }
    return queryInterface.bulkInsert('saved_chunks', demoData, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('saved_chunks')
  }
};

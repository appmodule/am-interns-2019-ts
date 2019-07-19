'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('saved_chunks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      filepath: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      duration: {
        allowNull: false,
        type: Sequelize.REAL
      },
      variant_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'variant', // name of Target model
          key: 'id' // key in Target model that we're referencing
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('saved_chunks');
  }
};
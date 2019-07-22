'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'channels', // name of Target model
          key: 'id' // key in Target model that we're referencing
        }
      },
      uri: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      codecs: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      bandwidth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      disabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
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
    return queryInterface.dropTable('variants');
  }
};
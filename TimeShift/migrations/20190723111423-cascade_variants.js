'use strict';

async function getConstraintName(queryInterface, tableName, column) {
  let arr = await queryInterface.getForeignKeyReferencesForTable('variants')
  return arr.find(val => val.columnName == column).constraintName
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let constraint = await getConstraintName(queryInterface,"variants","channel_id")
    await queryInterface.removeConstraint('variants',constraint)
    await queryInterface.addConstraint('variants',['channel_id'],{
      type: 'foreign key',
      name: constraint,
      references: { 
        table: 'channels',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    let constraint = await getConstraintName(queryInterface,"variants","channel_id")
    await queryInterface.removeConstraint('variants',constraint)
    await queryInterface.addConstraint('variants',['channel_id'],{
      type: 'foreign key',
      name: constraint,
      references: { 
        table: 'channels',
        field: 'id'
      },
    })
  }
};

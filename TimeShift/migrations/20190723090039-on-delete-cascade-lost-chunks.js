'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try 
    {
      await queryInterface.removeConstraint('lost_chunks','lost_chunks_variant_id_fkey')
      await queryInterface.addConstraint('lost_chunks',['variant_id'],{
        type: 'foreign key',
        name: 'lost_chunks_variant_id_fkey',
        references: { 
          table: 'variants',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
  }
  catch(err)
  {
    console.log(err)
    throw err
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('lost_chunks','lost_chunks_variant_id_fkey')
    await queryInterface.addConstraint('lost_chunks',['variant_id'],{
      type: 'foreign key',
      name: 'lost_chunks_variant_id_fkey',
      references: { 
        table: 'variants',
        field: 'id'
      }
    })
  }
};

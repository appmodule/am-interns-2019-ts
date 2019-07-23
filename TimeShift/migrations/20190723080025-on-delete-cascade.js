'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try 
    {
      await queryInterface.removeConstraint('saved_chunks','saved_chunks_variant_id_fkey')
      await queryInterface.addConstraint('saved_chunks',['variant_id'],{
        type: 'foreign key',
        name: 'saved_chunks_variant_id_fkey',
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
    await queryInterface.removeConstraint('saved_chunks','saved_chunks_variant_id_fkey')
    await queryInterface.addConstraint('saved_chunks',['variant_id'],{
      type: 'foreign key',
      name: 'saved_chunks_variant_id_fkey',
      references: { 
        table: 'variants',
        field: 'id'
      }
    })
  }
};

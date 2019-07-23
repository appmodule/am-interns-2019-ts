'use strict';
module.exports = (sequelize, DataTypes) => {
  const lost_chunk = sequelize.define('lost_chunk', {
    variant_id: DataTypes.INTEGER,
    start: DataTypes.DATE
  }, {});
  lost_chunk.associate = function(models) {
    lost_chunk.belongsTo(models.variant,{foreignKey:"variant_id",onDelete:'CASCADE'})
  };
  return lost_chunk;
};
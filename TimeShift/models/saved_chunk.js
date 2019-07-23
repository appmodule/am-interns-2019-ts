'use strict';
module.exports = (sequelize, DataTypes) => {
  const saved_chunk = sequelize.define('saved_chunk', {
    timestamp: DataTypes.DATE,
    filepath: DataTypes.TEXT,
    duration: DataTypes.REAL,
    variant_id: DataTypes.INTEGER,
    media_sequence: DataTypes.INTEGER
  }, {});
  saved_chunk.associate = function(models) {
    saved_chunk.belongsTo(models.variant, {foreignKey : "variant_id",onDelete:"cascade"})
  };
  return saved_chunk;
};
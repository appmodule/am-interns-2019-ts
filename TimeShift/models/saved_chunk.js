'use strict';
module.exports = (sequelize, DataTypes) => {
  const saved_chunk = sequelize.define('saved_chunk', {
    timestamp: DataTypes.DATE,
    filepath: DataTypes.TEXT,
    duration: DataTypes.REAL,
    variant_id: DataTypes.INTEGER
  }, {});
  saved_chunk.associate = function(models) {
    // associations can be defined here
    saved_chunk.belongsTo(models.variant)
  };
  return saved_chunk;
};
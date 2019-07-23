'use strict';
module.exports = (sequelize, DataTypes) => {
  const variant = sequelize.define('variant', {
    channel_id: DataTypes.INTEGER,
    uri: DataTypes.TEXT,
    codecs: DataTypes.TEXT,
    bandwidth: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN
  }, {});
  variant.associate = function(models) {
    variant.belongsTo(models.channel, {foreignKey: 'channel_id'})
    variant.hasMany(models.saved_chunk, {foreignKey : "variant_id"})
    variant.hasMany(models.lost_chunk, {foreignKey : "variant_id",onDelete:'CASCADE'})
  };
  return variant;
};
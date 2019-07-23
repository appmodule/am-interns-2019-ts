'use strict';
module.exports = (sequelize, DataTypes) => {
  const channel = sequelize.define('channel', {
    uri: DataTypes.TEXT,
    number_failed: DataTypes.INTEGER,
    number_succeded: DataTypes.INTEGER,
    hours_to_record: DataTypes.INTEGER,
    name: DataTypes.TEXT
  }, {});
  channel.associate = function(models) {
    channel.hasMany(models.variant, {foreignKey : "channel_id",onDelete:'CASCADE'})
  };
  return channel;
};
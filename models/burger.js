'use strict';
module.exports = (sequelize, DataTypes) => {
  const burger = sequelize.define('burger', {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  burger.associate = function(models) {
    // associations can be defined here
  };
  return burger;
};
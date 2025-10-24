'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lineStatus: {
        type: DataTypes.ENUM('online', 'offline'),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

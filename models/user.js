'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
    }
  }
  User.init({
    NIM: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `NIM is required` },
        notEmpty: { msg: `NIM is required` },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        passLength(password) {
          if (password.length < 5) throw { msg: 'Password must at least contain 5 or more characters' }
        },
        notNull: { msg: `password is required` },
        notEmpty: { msg: `password is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
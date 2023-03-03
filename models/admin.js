'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.hasMany(models.Student)
    }
  }
  Admin.init({
    NIP: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `NIP must be unique` },
      validate: {
        notNull: { msg: `NIP is required` },
        notEmpty: { msg: `NIP is required` },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `name is required` },
        notEmpty: { msg: `name is required` },
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
    modelName: 'Admin',
  });
  return Admin;
};
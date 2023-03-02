'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {
      Attendance.belongsTo(models.Student)
    }
  }
  Attendance.init({
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `StudentId is required` },
        notEmpty: { msg: `StudentId is required` },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `status is required` },
        notEmpty: { msg: `status is required` },
      }
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `week is required` },
        notEmpty: { msg: `week is required` },
      }
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `month is required` },
        notEmpty: { msg: `month is required` },
      }
    },
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
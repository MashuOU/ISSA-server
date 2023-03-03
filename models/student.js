'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {

    static associate(models) {
      // Student.hasMany(models.Score, { foreignKey: 'StudentId' })
      Student.belongsTo(models.Admin)
      Student.hasMany(models.Attendance)
    }
  }
  Student.init({
    NIM: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `NIM must be unique` },
      validate: {
        notNull: { msg: `NIM is required` },
        notEmpty: { msg: `NIM is required` },
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
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `age is required` },
        notEmpty: { msg: `age is required` },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `gender is required` },
        notEmpty: { msg: `gender is required` },
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: `birthDate is required` },
        notEmpty: { msg: `birthDate is required` },
      }
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `feedback is required` },
        notEmpty: { msg: `feedback is required` },
      }
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `TeacherId is required` },
        notEmpty: { msg: `TeacherId is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};
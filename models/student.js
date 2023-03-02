'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasMany(models.Score, { foreignKey: 'StudentId' })
      Student.belongsTo(models.Admin)
      // Student.hasMany(models.Attendance)
    }
  }
  Student.init({
    NIM: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    feedback: DataTypes.STRING,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};
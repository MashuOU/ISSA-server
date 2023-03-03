'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {

    static associate(models) {
      Score.belongsTo(models.Student, { foreignKey: 'StudentId', sourceKey: 'id' })
      Score.belongsTo(models.Lesson, { foreignKey: 'LessonId', sourceKey: 'id' })
    }
  }
  Score.init({
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `StudentId is required` },
        notEmpty: { msg: `StudentId is required` },
      }
    },
    LessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `LessonId is required` },
        notEmpty: { msg: `LessonId is required` },
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `value is required` },
        notEmpty: { msg: `value is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};
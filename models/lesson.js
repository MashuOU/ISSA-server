'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {

    static associate(models) {
      Lesson.hasMany(models.Score, { foreignKey: 'LessonId' })
    }
  }
  Lesson.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `name is required` },
        notEmpty: { msg: `name is required` },
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `slug is required` },
        notEmpty: { msg: `slug is required` },
      }
    }
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Scores.belongsTo(models.Student, { foreignKey: 'StudentId', sourceKey: 'id' })
      Scores.belongsTo(models.Lesson, { foreignKey: 'LessonId', sourceKey: 'id' })
    }
  }
  Scores.init({
    StudentId: DataTypes.INTEGER,
    LessonId: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Scores',
  });
  return Scores;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.belongsTo(models.Student);
      Score.belongsTo(models.Lesson);
    }
  }
  Score.init(
    {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            scoreValue(score) {
            if (score < 0 || score > 100) throw  'score value range is 0 to 100' 
          },
          notNull: { msg: `value is required` },
          notEmpty: { msg: `value is required` },
        },
      },
      category: DataTypes.STRING,
      desc: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `StudentId is required` },
          notEmpty: { msg: `StudentId is required` },
        },
      },
      LessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `LessonId is required` },
          notEmpty: { msg: `LessonId is required` },
        },
      },
    },
    {
      sequelize,
      modelName: 'Score',
    }
  );
  return Score;
};

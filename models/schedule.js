'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Class);
      Schedule.belongsTo(models.Lesson);
    }
  }
  Schedule.init(
    {
      ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `ClassId is required` },
          notEmpty: { msg: `ClassId is required` },
          isNumeric: { msg: `ClassId must be a number` }
        }
      },
      LessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `LessonId is required` },
          notEmpty: { msg: `LessonId is required` },
          isNumeric: { msg: `LessonId must be a number` }
        }
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `day is required` },
          notEmpty: { msg: `day is required` },
        }
      },
    },
    {
      sequelize,
      modelName: 'Schedule',
    }
  );
  return Schedule;
};

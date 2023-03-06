'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.hasMany(models.Score);
      Lesson.hasMany(models.Schedule);
    }
  }
  Lesson.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `name is required` },
          notEmpty: { msg: `name is required` },
        }
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `imgUrl is required` },
          notEmpty: { msg: `imgUrl is required` },
        }
      },
      KKM: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `KKM is required` },
          notEmpty: { msg: `KKM is required` },
          isNumeric: { msg: `KKM must be a number` }
        }
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `desc is required` },
          notEmpty: { msg: `desc is required` },
        }
      },
      // ScheduleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Lesson',
    }
  );
  return Lesson;
};

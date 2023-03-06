'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.belongsTo(models.Class);
    }
  }
  Exam.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `name is required` },
          notEmpty: { msg: `name is required` },
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
      ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `ClassId is required` },
          notEmpty: { msg: `ClassId is required` },
          isNumeric: { msg: `ClassId must be a number` },
        }
      },
    },
    {
      sequelize,
      modelName: 'Exam',
    }
  );
  return Exam;
};

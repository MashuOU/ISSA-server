'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Class);
    }
  }
  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `name is required` },
          notEmpty: { msg: `name is required` },
        }
      },
      ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `ClassId is required` },
          notEmpty: { msg: `ClassId is required` },
          isNumeric: { msg: `ClassId must be a number` }
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
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};

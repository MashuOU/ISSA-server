'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Teacher);
      Class.hasMany(models.Student);
      Class.hasMany(models.Schedule);
      Class.hasMany(models.Task);
      Class.hasMany(models.Exam);
    }
  }
  Class.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `name is required` },
          notEmpty: { msg: `name is required` }
        }
      },
      TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `TeacherId is required` },
          notEmpty: { msg: `TeacherId is required` },
          isNumeric: { msg: `TeacherId must be a number` }
        }
      },
      SPP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `SPP is required` },
          notEmpty: { msg: `SPP is required` },
          isNumeric: { msg: `SPP must be a number` }
        }
      },
    },
    {
      sequelize,
      modelName: 'Class',
    }
  );
  return Class;
};

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
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      TeacherId: DataTypes.INTEGER,
      SPP: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Class',
    }
  );
  return Class;
};

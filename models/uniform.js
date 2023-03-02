'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Uniform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Uniform.init({
    name: DataTypes.STRING,
    addtional1: DataTypes.STRING,
    additional2: DataTypes.STRING,
    additional3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Uniform',
  });
  return Uniform;
};
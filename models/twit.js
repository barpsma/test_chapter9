'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Twit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Twit.init({
    userid: DataTypes.INTEGER,
    twit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Twit',
  });
  return Twit;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinics.belongsTo(models.Allcodes, {
        targetKey: "keyMap",
        foreignKey: "provinceId",
        as: "provinceData",
      });
      Clinics.hasOne(models.Doctor_infos, {
        foreignKey: "clinicId",
      });
    }
  }
  Clinics.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      contentHTMLIntro: DataTypes.TEXT("long"),
      contentMarkDownIntro: DataTypes.TEXT("long"),
      provinceId: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clinics",
    }
  );
  return Clinics;
};

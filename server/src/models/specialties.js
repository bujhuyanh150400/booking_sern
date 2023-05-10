"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialties.hasOne(models.Doctor_infos, { foreignKey: "specialtyId" });
    }
  }
  Specialties.init(
    {
      name: DataTypes.STRING,
      contentHTMLIntro: DataTypes.TEXT("long"),
      contentMarkDownIntro: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Specialties",
    }
  );
  return Specialties;
};

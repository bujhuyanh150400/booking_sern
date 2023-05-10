"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Markdowns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Quan hệ database
    static associate(models) {
      Markdowns.belongsTo(models.Users, { foreignKey: "doctorId" });
    }
  }
  Markdowns.init(
    {
      contentHTMLIntro: DataTypes.TEXT("long"),
      contentMarkDownIntro: DataTypes.TEXT("long"),
      contentHTMLDesc: DataTypes.TEXT("long"),
      contentMarkDownDesc: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Markdowns",
    }
  );
  return Markdowns;
};

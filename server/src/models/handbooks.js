"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HandBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Quan hệ database
    static associate(models) {
      HandBooks.belongsTo(models.Users, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "handbookByDoctor",
      });
    }
  }
  HandBooks.init(
    {
      doctorId: DataTypes.INTEGER,
      contentHTMLIntro: DataTypes.TEXT("long"),
      contentMarkDownIntro: DataTypes.TEXT("long"),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HandBooks",
    }
  );
  return HandBooks;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookings.belongsTo(models.Users, {
        foreignKey: "patientId",
        targetKey: "id",
        as: "patientData",
      });
      Bookings.belongsTo(models.Allcodes, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeBookingData",
      });
      Bookings.belongsTo(models.Allcodes, {
        foreignKey: "statusId",
        targetKey: "keyMap",
        as: "statusData",
      });
    }
  }
  Bookings.init(
    {
      statusId: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      reason: DataTypes.TEXT("long"),
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookings",
    }
  );
  return Bookings;
};

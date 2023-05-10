"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Quan hệ database
    static associate(models) {
      Allcodes.hasMany(models.Users,{foreignKey:"positionId", as:"positionData"});
      Allcodes.hasMany(models.Users,{foreignKey:"gender", as:"genderData"});
      Allcodes.hasMany(models.Users,{foreignKey:"roleId", as:"roleData"});
      Allcodes.hasMany(models.Schedules,{foreignKey:"timeType", as:"timeTypeData"});
      Allcodes.hasMany(models.Doctor_infos,{foreignKey:"priceId", as:"priceType"});
      Allcodes.hasMany(models.Doctor_infos,{foreignKey:"provinceId", as:"provinceType"});
      Allcodes.hasMany(models.Doctor_infos,{foreignKey:"paymentId", as:"paymentType"});
      Allcodes.hasMany(models.Clinics,{foreignKey:"provinceId", as:"provinceData"});
      Allcodes.hasMany(models.Bookings,{foreignKey:"statusId", as:"statusData"});
      Allcodes.hasMany(models.Bookings,{foreignKey:"timeType", as:"timeTypeBookingData"});

    }
  }
  Allcodes.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEN: DataTypes.STRING,
      valueVI: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcodes",
    }
  );
  return Allcodes;
};

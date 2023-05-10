"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_infos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_infos.belongsTo(models.Users, { foreignKey: "doctorId" });
      Doctor_infos.belongsTo(models.Allcodes, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceType",
      });
      Doctor_infos.belongsTo(models.Allcodes, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceType",
      });
      Doctor_infos.belongsTo(models.Allcodes, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentType",
      });
      Doctor_infos.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
      });
      Doctor_infos.belongsTo(models.Clinics, {
        foreignKey: "clinicId",
      });
    }
  }
  Doctor_infos.init(
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_infos",
    }
  );
  return Doctor_infos;
};

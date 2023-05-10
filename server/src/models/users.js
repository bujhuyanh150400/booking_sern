"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Quan hệ database
    static associate(models) {
      Users.belongsTo(models.Allcodes, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      });
      Users.belongsTo(models.Allcodes, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      Users.belongsTo(models.Allcodes, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleData",
      });
      Users.hasOne(models.Markdowns, { foreignKey: "doctorId" });
      Users.hasOne(models.Doctor_infos, { foreignKey: "doctorId" });
      Users.hasMany(models.Schedules, {
        foreignKey: "doctorId",
        as: "doctorData",
      });
      Users.hasMany(models.HandBooks, {
        foreignKey: "doctorId",
        as: "handbookByDoctor",
      });
      Users.hasMany(models.Bookings, {
        foreignKey: "patientId",
        as: "patientData",
      });
    }
  }
  Users.init(
    {
      fullname: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

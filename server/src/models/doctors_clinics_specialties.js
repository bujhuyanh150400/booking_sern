"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctors_Clinics_Specialties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctors_Clinics_Specialties.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicIc: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctors_Clinics_Specialties",
    }
  );
  return Doctors_Clinics_Specialties;
};

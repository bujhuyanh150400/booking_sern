"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // statusId: DataTypes.STRING,
      // doctorId: DataTypes.INTEGER,
      // patientId: DataTypes.INTEGER,
      // date: DataTypes.STRING,
      // timeType: DataTypes.STRING,
      // reason:DataTypes.TEXT("long"),
      // token:DataTypes.STRING,

      statusId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      timeType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      reason: {
        type: Sequelize.TEXT("long"),
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};

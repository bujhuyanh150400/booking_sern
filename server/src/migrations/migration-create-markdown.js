"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Markdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // contentHTMLIntro: DataTypes.TEXT("long"),
      // contentMarkDownIntro: DataTypes.TEXT("long"),
      // contentHTMLDesc: DataTypes.TEXT("long"),
      // contentMarkDownDesc: DataTypes.TEXT("long"),
      // doctorId: DataTypes.INTEGER,
      // specialtyId: DataTypes.INTEGER,
      // clinicId: DataTypes.INTEGER,
      contentHTMLIntro: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentMarkDownIntro: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentHTMLDesc: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentMarkDownDesc: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Markdowns");
  },
};

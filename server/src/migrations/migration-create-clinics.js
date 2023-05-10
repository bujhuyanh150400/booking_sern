"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clinics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // name: DataTypes.STRING,
      // address: DataTypes.STRING,
      // contentHTMLIntro: DataTypes.TEXT("long"),
      // contentMarkDownIntro: DataTypes.TEXT("long"),
      // provinceId:DataTypes.STRING,
      // image: DataTypes.STRING,
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentHTMLIntro: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      provinceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contentMarkDownIntro: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      image: {
        type: Sequelize.BLOB("long"),
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
    await queryInterface.dropTable("Clinics");
  },
};

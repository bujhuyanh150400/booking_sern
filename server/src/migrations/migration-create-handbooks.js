"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HandBooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // doctorId: DataTypes.INTEGER,
      // contentHTMLIntro: DataTypes.TEXT("long"),
      // contentMarkDownIntro: DataTypes.TEXT("long"),
      // image: DataTypes.STRING,
      contentHTMLIntro: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentMarkDownIntro: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("HandBooks");
  },
};

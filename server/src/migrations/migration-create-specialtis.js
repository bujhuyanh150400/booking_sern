"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Specialties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // name: DataTypes.STRING,
      // contentHTMLIntro: DataTypes.TEXT("long"),
      // contentMarkDownIntro: DataTypes.TEXT("long"),
      // image: DataTypes.BLOB("long"),
      name: {
        type: Sequelize.STRING,
      },
      contentHTMLIntro: {
        type: Sequelize.TEXT("long"),
      },
      contentMarkDownIntro: {
        type: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("Specialties");
  },
};

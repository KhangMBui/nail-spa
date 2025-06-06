"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Incomes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      subTotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tip: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tipForOwner: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      tipForWorker: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Incomes");
  },
};

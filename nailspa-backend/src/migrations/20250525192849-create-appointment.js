"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      customerPhone: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      // serviceId: {
      //   type: Sequelize.INTEGER,
      // },
      workerId: {
        type: Sequelize.INTEGER,
      },
      notes: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Appointments");
  },
};

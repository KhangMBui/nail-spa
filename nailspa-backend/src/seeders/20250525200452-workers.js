"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Workers", [
      {
        name: "Ngoc Vy Luong",
        role: "Gel Specialist",
        salary: "25.66",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Minh Khang Bui",
        role: "Boss",
        salary: "1000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Phuc Nghi Pham",
        role: "Receptionist",
        salary: "17.13",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hoang Phuong Thi Bui",
        role: "Manicure Specialist",
        salary: "17.25",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Devon Mario Young",
        role: "Security",
        salary: "16.66",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vy Pham Kha",
        role: "Pedicure Specialist",
        salary: "17.25",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Donovan Tran",
        role: "Janitor",
        salary: "7.89",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Uy Duc Pham",
        role: "Janitor",
        salary: "7.89",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Workers", null, {});
  },
};

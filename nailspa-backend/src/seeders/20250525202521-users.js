"use strict";
import bcrypt from "bcrypt";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Khang Bui",
        role: "admin",
        email: "khangbui2002@gmail.com",
        password: await bcrypt.hash("Maruko12345!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

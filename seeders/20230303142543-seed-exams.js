'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require('../data-seeding/exams.json').map((x) => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
      return x;
    });
    await queryInterface.bulkInsert('Exams', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exams', null, {});
  },
};

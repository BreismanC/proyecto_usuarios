"use strict";

/** @type {import('sequelize-cli').Migration} */
const models = require("../models/index");

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      models.users.findOrCreate({
        where: {
          id: 1,
        },
        defaults: {
          name: "breisman",
          lastname: "chalaca",
          email: "breisman@chalaca",
          password: "Aa1_aa",
          image: "Unknown_person",
        },
      }),

      models.users.findOrCreate({
        where: {
          id: 2,
        },
        defaults: {
          name: "prueba",
          lastname: "prueba",
          email: "usuarioPrueba@usuarioPrueba.com",
          password: "Prueba_1",
          image: "Unknown_person",
        },
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

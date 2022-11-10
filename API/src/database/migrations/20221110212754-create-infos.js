'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('infos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      descricao: {
        type: Sequelize.STRING,
        allowNUll: false
      },
      
      missao: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      visao: {
        type: Sequelize.STRING,
        allowNUll: false
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNUll: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false
      }
      
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('infos');
    
  }
};

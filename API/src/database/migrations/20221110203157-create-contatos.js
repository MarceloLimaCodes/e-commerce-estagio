'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('contatos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      endereco: {
        type: Sequelize.STRING,
        allowNUll: false
      },
      
      email: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      celular: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      observacao: {
        type: Sequelize.STRING,
        allowNUll: false
      },
      
      site: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      whatsapp: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      geo_localizacao: {
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
    await queryInterface.dropTable('contatos');
    
  }
};

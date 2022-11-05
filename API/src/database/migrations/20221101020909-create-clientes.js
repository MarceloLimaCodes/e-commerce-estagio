'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNUll: false
      },

      nome: {
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

      rua: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      bairro: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      estado: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      cpf: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      whatsapp: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      cep: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      numero: {
      type: Sequelize.STRING,
      allowNUll: false
      },

      cidade: {
        type: Sequelize.STRING,
        allowNUll: false
      },

      observacao: {
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
    await queryInterface.dropTable('clientes');
    
  }
};
